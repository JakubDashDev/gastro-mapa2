import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Filters from '../features/Filters';

function FilterSideNav({ setIsOpen }) {
  return (
    <div className="container mx-auto px-4 pb-4 absolute top-0 left-0 w-screen sm:w-[390px] bg-white dark:bg-darkBg h-screen overflow-y-auto">
      <section className="grid items-center grid-rows-1 grid-cols-4">
        <button
          className="text-lg"
          onClick={() => setIsOpen((current) => !current)}
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-center text-lg font-extrabold my-5 col-span-2">
          Filtry
        </h2>
      </section>

      <Filters setIsOpen={setIsOpen} />
    </div>
  );
}

export default FilterSideNav;
