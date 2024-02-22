import React from 'react';
import img from '../../assets/logo.png';
import Rating from './Rating';

function RestaurantListComponent({ restaurant }) {
  const { _id, name, address, type, rating } = restaurant;
  return (
    <div
      key={_id}
      className="container mx-auto px-4 py-4 flex gap-2 items-center hover:bg-gray-200 transition-colors rounded-lg"
    >
      <img
        src={img}
        alt="placeholeder image"
        className="rounded-full h-[50px]"
      />

      <div className="flex flex-col ">
        <span className="font-extrabold text-gray-600 tracking-wide">
          {name} - {address.city}
        </span>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 capitalize ">{type[0]}</span>
          <Rating rating={rating} />
        </div>
      </div>
    </div>
  );
}
// text-yellow-500 flex items-center font-bold
export default RestaurantListComponent;
