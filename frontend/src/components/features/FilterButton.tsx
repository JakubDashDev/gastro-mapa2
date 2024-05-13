import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideNav from "../ui/FilterSideNav";
import { useAppSelector } from "../../redux/store";

function FilterButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { filterQuery, isActive } = useAppSelector((state) => state.filters);

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <button onClick={() => setIsOpen((prev) => !prev)} className="flex flex-col items-center gap-1">
        <span className="text-gray-500 dark:text-gray-300 ">Filtry</span>
        {isActive && <span className="text-red-600">({filterQuery.length})</span>}
        <FaFilter />
      </button>

      <FilterSideNav setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
}

export default FilterButton;
