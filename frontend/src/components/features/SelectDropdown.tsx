import React, { createContext, useContext, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import getParams from "../../utils/getUrlParams";

type SelectContexType = {
  activeOption: string;
  setActiveOption: (value: string) => void;
};
const SelectContext = createContext<SelectContexType | null>(null);

type SelectType = {
  children: React.ReactNode;
  className?: string;
  defaultValue: string;
};

function Select({ children, className, defaultValue }: SelectType) {
  const { sort } = getParams(location);
  const [activeOption, setActiveOption] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SelectContext.Provider value={{ activeOption, setActiveOption }}>
      <div className="w-full h-full relative">
        <button type="button" className={`flex items-center justify-between ${className} w-full`} onClick={handleOpen}>
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

type OptionType = {
  value: string;
  children: React.ReactNode;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function Option({ value, children, handleClick }: OptionType) {
  const { activeOption, setActiveOption } = useSelectContext();

  const isActive = activeOption === value;
  const className = `border-b border-gray-200 py-1 text-gray-500 dark:text-gray-700 ${
    isActive ? "bg-primary/80 text-black-500 disabled:cursor-not-allowed" : "bg-none hover:bg-gray-200 transition-color"
  }`;

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveOption(value);
    handleClick && handleClick(event);
  };

  return (
    <button type="button" className={className} value={value} onClick={onClick} disabled={activeOption === value}>
      {children}
    </button>
  );
}

Select.Option = Option;

export default Select;

const useSelectContext = () => {
  const context = useContext(SelectContext);

  if (!context) {
    throw new Error("useSelectContext should be used within the scope of a Select component");
  }

  return context;
};
