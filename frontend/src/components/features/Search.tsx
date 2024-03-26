import React, { FormEvent, useEffect, useState } from "react";
import { MdOutlineClose, MdOutlineSearch } from "react-icons/md";
import { useLazyGetRestaurantsQuery } from "../../services/restaurantsApi";
import { useDispatch } from "react-redux";
import { setRestaurants } from "../../redux/restaurantsSlice";
import useGetRestaurantsLazy from "../../hooks/useGetRestaurantsLazy";

function Search() {
  //prettier-ignore
  const savedValue = localStorage.getItem('searchInput') ? JSON.parse(localStorage.getItem('searchInput') || "") : ""
  const [inputState, setInputState] = useState<string>(savedValue);

  const { isCustomText } = useCustomText(inputState);
  const { getRestaurants, isLoading, error } = useGetRestaurantsLazy();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getRestaurants({ keyword: inputState, filters: undefined });
  };

  const handleClearInput = () => {
    setInputState("");
    getRestaurants({ keyword: undefined, filters: undefined });
    localStorage.removeItem("searchInput");
  };

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setInputState(event.currentTarget.value);
    localStorage.setItem("searchInput", JSON.stringify(inputState));
  };

  return (
    <form className="relative py-1" onSubmit={handleSearch}>
      <MdOutlineSearch className="absolute top-[50%] left-2 translate-y-[-50%] text-xl text-gray-400" />
      <input
        className={`w-full bg-gray-200 py-2 px-8 rounded-lg outline-none ${
          isCustomText
            ? "text-primary-500 font-loader pt-3"
            : "text-black font-sans"
        }`}
        placeholder="Wyszukaj..."
        value={inputState}
        onChange={handleInput}
      />
      {inputState.length > 0 && (
        <button
          type="button"
          className="absolute top-[50%] right-2 translate-y-[-50%] text-xl text-gray-600"
          onClick={handleClearInput}
        >
          <MdOutlineClose />
        </button>
      )}
    </form>
  );
}

export default Search;

const useCustomText = (inputState: string) => {
  const [isCustomText, setIsCustomText] = useState(false);

  useEffect(() => {
    if (inputState.toLowerCase() === "muala") {
      setIsCustomText(true);
    } else {
      setIsCustomText(false);
    }
  }, [inputState]);

  return { isCustomText };
};