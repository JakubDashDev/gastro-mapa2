import Rating from "./Rating";
import { FaPenToSquare } from "react-icons/fa6";
import { useAppSelector } from "../../redux/store";
import useGetRestaurantsAdmin from "../../hooks/useGetRestaurantsAdmin";
import Loader from "./Loader";
import { RestaurantType } from "../../redux/restaurantsSlice";
import { Fragment } from "react";
import { ModalProps } from "./Modal";
import { useNavigate } from "react-router-dom";
import ActionButtons from "../features/ActionButtons";

function RestaurantList({ isShow, setIsShow }: ModalProps) {
  const navigate = useNavigate();
  const { restaurants } = useAppSelector((state) => state.restaurants);

  const handleOpen = (id: string) => {
    navigate(`/dashboard/restaurants/${id}`);
    setIsShow(true);
  };

  return (
    <section className="w-full flex flex-col">
      <div className="hidden container px-4 mx-auto xl:grid grid-cols-9 grid-rows-1 font-bold pt-5 pb-3 uppercase text-sm border-b-2 border-neutral-300">
        <span className="col-span-2">Restauracja</span>
        <span>Ocena</span>
        <span className=" col-span-3">Adres</span>
        <span className="col-span-2">Kategorie</span>
        <span>Akcje</span>
      </div>
      {restaurants.map((restaurant: RestaurantType) => (
        <Fragment>
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
      className="lg:text-black/80 group container flex flex-col gap-2 xl:gap-0 px-4 py-5 mx-auto capitalize xl:grid grid-cols-9 grid-rows-1 group odd:bg-white even:bg-neutral-200 hover:bg-blue-900/20 cursor-pointer transition-all"
    >
      <strong className="col-span-2">{restaurant.name}</strong>
      <Fragment>
        <Rating rating={restaurant.rating} />
      </Fragment>
      <span className=" col-span-3 text-sm">
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
