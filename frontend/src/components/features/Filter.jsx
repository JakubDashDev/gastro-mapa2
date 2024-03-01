import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterSideNav from '../ui/FilterSideNav';

function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <span className="text-gray-500">Filtry</span>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        <FaFilter className="text-lg text-gray-600" />
      </button>

      {isOpen && <FilterSideNav setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Filter;
