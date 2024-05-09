import Rating from "./Rating";
import { FaPenToSquare } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import useGetRestaurantsAdmin from "../../hooks/useGetRestaurantsAdmin";
import Loader from "./Loader";
import { RestaurantType, sortRestaurants } from "../../redux/restaurantsSlice";
import { Fragment, useState } from "react";
import { ModalProps } from "./Modal";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../features/ActionButtons";
import { FaSort } from "react-icons/fa";

function RestaurantList({ isShow, setIsShow }: ModalProps) {
  const navigate = useNavigate();
  const { restaurants } = useAppSelector((state) => state.restaurants);

  const handleOpen = (id: string) => {
    navigate(`/dashboard/restaurants/${id}`);
    setIsShow(true);
  };

  return (
    <section id="restaurantListAdmin" className="w-full h-[600px] flex flex-col overflow-y-scroll">
      <div className="hidden container px-4 mx-auto xl:grid grid-cols-9 grid-rows-1 font-bold pt-5 pb-3 uppercase text-sm border-b-2 border-neutral-300 ">
        <SpanSort type="name" className="text-left col-span-2 cursor-pointer flex items-center gap-1 uppercase">
          Restauracja
          <FaSort />
        </SpanSort>
        <SpanSort type="rating" className="text-left col-span-2 cursor-pointer flex items-center gap-1 uppercase">
          Ocena
          <FaSort />
        </SpanSort>
        <span className=" col-span-2">Adres</span>
        <span className="col-span-2">Kategorie</span>
        <span>Akcje</span>
      </div>
      {restaurants.map((restaurant: RestaurantType) => (
        <Fragment key={restaurant._id}>
          <TableRow restaurant={restaurant} key={restaurant._id} onClick={() => handleOpen(restaurant._id!)} />
        </Fragment>
      ))}
    </section>
  );
}

export default RestaurantList;

type TableRowProps = {
  restaurant: RestaurantType;
  onClick: () => void;
};

function TableRow({ restaurant, onClick }: TableRowProps) {
  return (
    <div
      onClick={onClick}
      className="lg:text-black/80 group container flex flex-col gap-2 xl:gap-0 px-4 py-5 mx-auto capitalize xl:grid grid-cols-9 grid-rows-1 items-center group odd:bg-white even:bg-neutral-100 hover:bg-blue-900/20 cursor-pointer transition-all"
    >
      <strong className="col-span-2">{restaurant.name}</strong>
      <div className="col-span-2">
        <Rating rating={restaurant.rating} isText />
      </div>
      <span className=" col-span-2 text-sm">
        {restaurant.address.street}, {restaurant.address.city}
      </span>
      <span className="col-span-2 text-gray-400 lg:text-black/80">
        {restaurant.category.toString().replaceAll(",", ", ")}
      </span>
      <div className="">
        <ActionButtons restaurant={restaurant} textSize="text-xl" isEditIcon isTrashIcon />
      </div>
    </div>
  );
}

type SpanSortProps = {
  children: React.ReactNode;
  type: "name" | "rating";
  className?: string;
};
function SpanSort({ children, type, className }: SpanSortProps) {
  const dispatch = useAppDispatch();

  const [isAscending, setIsAscending] = useState(false);
  const [isAlphabetically, setIsAlphabetically] = useState(true);

  const handleSortName = () => {
    if (isAlphabetically) {
      dispatch(sortRestaurants("Alfabetycznie (Z-A)"));
    } else {
      dispatch(sortRestaurants("Alfabetycznie (A-Z)"));
    }
    setIsAlphabetically((current) => !current);
  };

  const handleSortRating = () => {
    if (isAscending) {
      dispatch(sortRestaurants("Ocena: malejąco"));
    } else {
      dispatch(sortRestaurants("Ocena: rosnąco"));
    }
    setIsAscending((current) => !current);
  };

  const handleClick = () => {
    type === "rating" ? handleSortRating() : handleSortName();
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
