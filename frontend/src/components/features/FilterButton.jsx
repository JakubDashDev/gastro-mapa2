import React, { createContext, useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSideNav from '../ui/FilterSideNav';
import { useSelector } from 'react-redux';

function FilterButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { filterQuery } = useSelector((state) => state.restaurants);
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div className="text-gray-500 dark:text-gray-300 flex items-center gap-1">
        <span>Filtry</span>
        {filterQuery.length > 0 && <span className='text-red-600'>({filterQuery.length})</span>}
      </div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-lg"
      >
        <FaFilter />
      </button>

      {isOpen && <FilterSideNav setIsOpen={setIsOpen} />}
    </div>
  );
}

export default FilterButton;
