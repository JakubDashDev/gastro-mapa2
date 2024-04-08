import Rating from "./Rating";
import { FaPenToSquare } from "react-icons/fa6";
import { useAppSelector } from "../../redux/store";
import useGetRestaurantsAdmin from "../../hooks/useGetRestaurantsAdmin";
import Loader from "./Loader";

function RestaurantList() {
  const { restaurants } = useAppSelector((state) => state.restaurants);

  return (
    <table className="min-w-full text-left text-sm whitespace-nowrap ">
      <thead className="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800">
        <tr>
          <th scope="col" className="px-6 py-5">
            Nazwa
          </th>
          <th scope="col" className="px-6 py-5">
            Ocena
          </th>
          <th scope="col" className="px-6 py-5">
            Adres
          </th>
          <th scope="col" className="px-6 py-5">
            Katrgoria
          </th>
          <th scope="col" className="px-6 py-5">
            YouTube
          </th>
        </tr>
      </thead>

      <tbody>
        {restaurants?.map((restaurant, index) => (
          <tr className={`border-b dark:border-neutral-600 ${index % 2 === 0 ? "bg-white" : "bg-neutral-50"}`}>
            <th scope="row" className="px-6 py-5">
              {restaurant.name}
            </th>
            <td className="px-6 py-5">
              <Rating rating={restaurant.rating} />
            </td>
            <td className="px-6 py-5">
              {restaurant.address.street}, {restaurant.address.city}
            </td>
            <td className="px-6 py-5 capitalize">{restaurant.category.toString()}</td>
            <td className="px-6 py-5 capitalize">
              <button type="button" className="text-blue-500 underline">
                Pokaż film
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RestaurantList;
