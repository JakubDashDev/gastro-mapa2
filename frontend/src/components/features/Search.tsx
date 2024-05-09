import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { MdOutlineClose, MdOutlineSearch } from "react-icons/md";
import useGetRestaurantsLazy from "../../hooks/useGetRestaurantsLazy";
import Loader from "../ui/Loader";

function Search() {
  //prettier-ignore
  const savedValue = localStorage.getItem('searchInput') ? JSON.parse(localStorage.getItem('searchInput') || "") : ""
  const [inputState, setInputState] = useState<string>(savedValue);

  const { isCustomText } = useCustomText(inputState);
  const { getRestaurants, error, isError, isFetching } = useGetRestaurantsLazy();


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
    <Fragment>
      <form className="relative py-1" onSubmit={handleSearch}>
        {isFetching ? (
          <div className="absolute top-[50%] left-1 translate-y-[-40%]">
            <Loader color="gray-700" colorDark="gray-200" />
          </div>
        ) : (
          <MdOutlineSearch className="text-gray-400 text-2xl absolute top-[50%] left-2 translate-y-[-50%]" />
        )}
        <input
          className={`w-full bg-neutral-300 dark:bg-neutral-600 dark:border-none border-none py-2 px-10 rounded-lg outline-none focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 ${
            isCustomText ? "text-primary-500 font-loader pt-3" : "text-black dark:text-white font-sans"
          }`}
          placeholder="Wyszukaj..."
          value={inputState}
          onChange={handleInput}
        />
        {inputState.length > 0 && (
          <button
            type="button"
            className="absolute top-[50%] right-2 translate-y-[-50%] text-xl text-gray-600 dark:text-white"
            onClick={handleClearInput}
          >
            <MdOutlineClose />
          </button>
        )}
      </form>
      {isError && (
        <div className="border border-red-500 bg-red-900/40 p-2 rounded-lg">
          {error && "data" in error ? error.data.message : "Wystąpił nieoczekiwany błąd podczas wyszukiwania 💔"}
        </div>
      )}
    </Fragment>
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
