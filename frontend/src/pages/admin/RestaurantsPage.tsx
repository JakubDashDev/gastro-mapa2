import React from 'react';
import RestaurantList from '../../components/admin/UI/RestaurantList';
import { FaPlus } from 'react-icons/fa6';
import RestaurantSearch from '../../components/admin/features/RestaurantSearch';

function RestaurantsPage() {
  return (
    <div className="flex flex-col gap-3 container mx-auto px-4">
      <button className="flex items-center justify-center w-[150px] gap-2 py-1 bg-primary-500 rounded-lg text-white">
        <FaPlus /> Dodaj
      </button>
      <div className="overflow-x-auto bg-neutral-50 dark:bg-neutral-700 rounded-lg shadow-xl">
        <RestaurantSearch />
        <RestaurantList />
      </div>
    </div>
  );
}

export default RestaurantsPage;
