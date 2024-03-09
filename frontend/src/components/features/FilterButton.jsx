import React, { createContext, useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSideNav from '../ui/FilterSideNav';

function FilterButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [ratingQuery, setRatingQuery] = useState([]);

  console.log(ratingQuery)

  return (
    <FilterContext.Provider
      value={{ isOpen, setIsOpen, ratingQuery, setRatingQuery }}
    >
      <div className="flex flex-col justify-center items-center gap-1">
        <span className="text-gray-500">Filtry</span>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <FaFilter className="text-lg text-gray-600" />
        </button>

        {isOpen && (
          <FilterSideNav
            setIsOpen={setIsOpen}
            ratingQuery={ratingQuery}
            setRatingQuery={setRatingQuery}
          />
        )}
      </div>
    </FilterContext.Provider>
  );
}

export default FilterButton;

export const FilterContext = createContext();
