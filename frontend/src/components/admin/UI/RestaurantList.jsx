import React from 'react';
import { useSelector } from 'react-redux';
import Rating from '../../ui/Rating';
import { FaPenToSquare } from 'react-icons/fa6';

function RestaurantList() {
  const { restaurants } = useSelector((state) => state.restaurants);
  return (
    <table class="min-w-full text-left text-sm whitespace-nowrap ">
      <thead class="uppercase tracking-wider border-b-2 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800">
        <tr>
          <th scope="col" class="px-6 py-5">
            Nazwa
          </th>
          <th scope="col" class="px-6 py-5">
            Ocena
          </th>
          <th scope="col" class="px-6 py-5">
            Adres
          </th>
          <th scope="col" class="px-6 py-5">
            Katrgoria
          </th>
          <th scope="col" class="px-6 py-5">
            YouTube
          </th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {restaurants?.map((restaurant, index) => (
          <tr
            class={`border-b dark:border-neutral-600 ${
              index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'
            }`}
          >
            <th scope="row" className="px-6 py-5">
              {restaurant.name}
            </th>
            <td class="px-6 py-5">
              <Rating rating={restaurant.rating} />
            </td>
            <td class="px-6 py-5">
              {restaurant.address.street} {restaurant.address.houseNumber},{' '}
              {restaurant.address.city}
            </td>
            <td class="px-6 py-5 capitalize">{restaurant.category[0]}</td>
            <td class="px-6 py-5 capitalize">
              <button type="button" className="text-blue-500 underline">
                Pokaż film
              </button>
            </td>
            <td class="px-6 py-5 capitalize">
              <button type="button" className="text-xl">
                <FaPenToSquare />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RestaurantList;
