import React, { Children, useEffect, useState } from 'react';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useLazyGetRestaurantsQuery } from '../../services/restaurantsApi';
import Filters from '../features/Filters';

function FilterSideNav({ setIsOpen }) {
  return (
    <div className="container mx-auto px-4 absolute top-0 left-0 min-w-[350px] w-1/5 bg-white h-screen">
      <section className="flex items-center justify-center text-gray-600">
        <button
          className="absolute left-10 text-lg"
          onClick={() => setIsOpen((current) => !current)}
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-center text-lg font-extrabold my-5">Filtry</h2>
      </section>

      <Filters setIsOpen={setIsOpen} />
    </div>
  );
}

export default FilterSideNav;
