import React from 'react';
import img from '../../assets/logo.png';
import Rating from './Rating';
import { useMap } from 'react-map-gl';

function RestaurantListComponent({ restaurant, setIsOpen }) {
  const { name, address, category, rating, latlng } = restaurant;
  const { mapMain } = useMap();

  const handleClick = () => {
    mapMain.flyTo({ center: [latlng.lng, latlng.lat], zoom: 13 });
    setIsOpen((current) => !current);
  };

  return (
    <div
      className="container mx-auto px-4 py-4 flex gap-2 items-center hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={img}
        alt="placeholeder image"
        className="rounded-full h-[50px]"
      />

      <div className="flex flex-col ">
        <span className="font-extrabold tracking-wide">
          {name} - {address.city}
        </span>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 capitalize ">{category[0]}</span>
          <Rating rating={rating} isText />
        </div>
      </div>
    </div>
  );
}
// text-yellow-500 flex items-center font-bold
export default RestaurantListComponent;
