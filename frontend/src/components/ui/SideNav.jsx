import React from 'react';
import RestaurantListComponent from './RestaurantListComponent';
import Search from '../features/Search';
import SortDropdown from '../features/SortDropdown';
import Filter from '../features/Filter';

function SideNav({ data }) {
  return (
    <div className="min-w-[350px] w-1/5 bg-white h-screen ">
      <h1 className="text-center text-gray-600 text-lg font-extrabold my-5">
        Gastro Mapa
      </h1>

      <div className="container mx-auto px-4 my-6">
        <Search />
      </div>
      <div className="container mx-auto px-4 my-6 flex justify-between items-center">
        <SortDropdown />
        <Filter />
      </div>

      <div>
        {data.map((restaurant) => {
          return (
            <RestaurantListComponent
              key={restaurant._id}
              restaurant={restaurant}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SideNav;
