import React, { Children, useState } from 'react';
import { FaArrowLeft, FaStar } from 'react-icons/fa';

function FilterSideNav({ setIsOpen }) {
  const [selected, setSelected] = useState([]);

  console.log(selected);

  return (
    <form className="flex flex-col container mx-auto px-4 fixed left-0 top-0 min-w-[350px] w-1/5 bg-white h-screen text-black">
      <div className="flex items-center justify-center text-gray-600">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="absolute left-4"
        >
          <FaArrowLeft className="text-lg" />
        </button>
        <h2 className=" text-lg font-extrabold my-5 w-full m-auto text-center">
          Filtruj
        </h2>
      </div>
      <RatingFilters selected={selected} setSelected={setSelected} />
      <CategoryFilters selected={selected} setSelected={setSelected} />

      <div className="flex flex-col justify-center mt-5">
        <button
          type="submit"
          className="w-full py-2 text-white rounded-lg bg-primary-500 hover:bg-primary-600 transition-colors"
        >
          Zastostuj
        </button>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full py-2 text-gray-500"
        >
          Anuluj
        </button>
      </div>
    </form>
  );
}

export default FilterSideNav;

function RatingFilters({ selected, setSelected }) {
  return (
    <div className="w-full flex flex-col">
      <h3 className="border-b my-3 text-lg">Ocena</h3>
      <div className="flex flex-col gap-2">
        <FilterButton
          selected={selected}
          value="1star"
          setSelected={setSelected}
        >
          <FaStar className="text-yellow-500" /> 1.0
        </FilterButton>
        <FilterButton
          selected={selected}
          value="2star"
          setSelected={setSelected}
        >
          <FaStar className="text-yellow-500" /> 2.0
        </FilterButton>
        <FilterButton
          selected={selected}
          value="3star"
          setSelected={setSelected}
        >
          <FaStar className="text-yellow-500" /> 3.0
        </FilterButton>
        <FilterButton
          selected={selected}
          value="4star"
          setSelected={setSelected}
        >
          <FaStar className="text-yellow-500" /> 4.0
        </FilterButton>
        <FilterButton
          selected={selected}
          value="5star"
          setSelected={setSelected}
        >
          <FaStar className="text-primary-500" />
          <span className="font-loader text-primary-500 -mb-1">Muala</span>
        </FilterButton>
      </div>
    </div>
  );
}

function CategoryFilters({ selected, setSelected }) {
  return (
    <div className="w-full flex flex-col">
      <h3 className="border-b mb-3 mt-5 text-lg">Kategoria</h3>
      <div className="flex flex-col gap-2">
        <FilterButton
          selected={selected}
          value="bar mleczny"
          setSelected={setSelected}
        >
          Bar Mleczny
        </FilterButton>
        <FilterButton
          selected={selected}
          value="burger"
          setSelected={setSelected}
        >
          Burger
        </FilterButton>
        <FilterButton
          selected={selected}
          value="chińczyk"
          setSelected={setSelected}
        >
          Chińczyk
        </FilterButton>
        <FilterButton
          selected={selected}
          value="dziadkowie biznesu"
          setSelected={setSelected}
        >
          Dziadkowie biznesu
        </FilterButton>
        <FilterButton
          selected={selected}
          value="jarmark"
          setSelected={setSelected}
        >
          Jarmark
        </FilterButton>
        <FilterButton
          selected={selected}
          value="kebab"
          setSelected={setSelected}
        >
          Kebab
        </FilterButton>
        <FilterButton
          selected={selected}
          value="makaron"
          setSelected={setSelected}
        >
          Makaron
        </FilterButton>
        <FilterButton
          selected={selected}
          value="pizza"
          setSelected={setSelected}
        >
          Pizza
        </FilterButton>
        <FilterButton
          selected={selected}
          value="restauracja"
          setSelected={setSelected}
        >
          Restauracja
        </FilterButton>
        <FilterButton
          selected={selected}
          value="słodycz"
          setSelected={setSelected}
        >
          Słodycz
        </FilterButton>
        <FilterButton
          selected={selected}
          value="zapiekanka"
          setSelected={setSelected}
        >
          Zapiekanka
        </FilterButton>
      </div>
    </div>
  );
}

function FilterButton({ selected, setSelected, value, children }) {
  //
  const handleClick = () => {
    if (selected.includes(value)) {
      setSelected((prev) => prev.filter((item) => item !== value));
    } else {
      setSelected((prev) => [...prev, value]);
    }
  };

  return (
    <label
      className={`flex items-center gap-2 py-1 px-5 pe-16 w-fit rounded-full text-gray-700 transition-colors ${
        selected.includes(value) ? 'bg-primary-500/35 ' : 'hover:bg-gray-300'
      }`}
    >
      <input
        type="checkbox"
        id={value}
        name={value}
        value={value}
        onClick={handleClick}
      />
      {children}
    </label>
  );
}
