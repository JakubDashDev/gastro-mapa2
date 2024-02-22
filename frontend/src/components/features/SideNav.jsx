import React from 'react';
import RestaurantListComponent from '../ui/RestaurantListComponent';

function SideNav({ data }) {
  return (
    <div className="min-w-[350px] w-1/5 bg-white h-screen ">
      <h1 className="text-center text-gray-600 text-lg font-extrabold my-5">
        Gastro Mapa
      </h1>

      <div className="my-6">
        <span>Search</span>
      </div>
      <div className="my-6">
        <span>Sort</span>
      </div>

      <div>
        {data.map((restaurant) => {
          return <RestaurantListComponent restaurant={restaurant} />;
        })}
      </div>
    </div>
  );
}

export default SideNav;
