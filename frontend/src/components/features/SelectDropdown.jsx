import React, { createContext, useContext, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

const SelectContext = createContext();

function Select({ children, className }) {
  const [activeOption, setActiveOption] = useState('Alfabetycznie (A-Z)');
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SelectContext.Provider value={{ activeOption, setActiveOption }}>
      <div className="w-full h-full relative">
        <button
          className={`flex items-center justify-between text-gray-500 ${className} w-full`}
          onClick={handleOpen}
        >
          <span className="overflow-hidden text-nowrap">{activeOption}</span>
          <IoMdArrowDropdown />
        </button>
        {isOpen && (
          <div
            className="absolute flex flex-col  w-full rounded-md border border-gray-400 bg-white shadow-lg overflow-hidden"
            onClick={handleOpen}
          >
            {children}
          </div>
        )}
      </div>
    </SelectContext.Provider>
  );
}

function Option({ value, children, handleSort }) {
  const { activeOption, setActiveOption } = useSelectContext();

  const isActive = activeOption === value;
  const className = `border-b border-gray-200 py-1 text-gray-500 ${
    isActive
      ? 'bg-primary/80 text-black-500 disabled:cursor-not-allowed'
      : 'bg-none hover:bg-gray-200 transition-color'
  }`;

  const handleClick = (event) => {
    setActiveOption(value);
    handleSort && handleSort(event);
  };

  return (
    <button
      className={className}
      value={value}
      onClick={handleClick}
      disabled={activeOption === value}
    >
      {children}
    </button>
  );
}

Select.Option = Option;

export default Select;

const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error(
      'useSelectContext should be used within the scope of a Select component'
    );
  }

  return context;
};