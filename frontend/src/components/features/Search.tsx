import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { MdOutlineClose, MdOutlineSearch } from "react-icons/md";
import useGetRestaurantsLazy from "../../hooks/useGetRestaurantsLazy";
import Loader from "../ui/Loader";
import setParams from "../../utils/setUrlParams";
import { useNavigate } from "react-router-dom";
import deleteUrlParams from "../../utils/deleteUrlParams";
import getParams from "../../utils/getUrlParams";

function Search() {
  const { keywordQuery } = getParams(location);
  const [inputState, setInputState] = useState<string>(keywordQuery);
  const [timer, setTimer] = useState<any>(null); //setTimeout on handleChange

  const navigate = useNavigate();

  const { isCustomText } = useCustomText(inputState);
  const { getRestaurants, error, isError, isFetching } = useGetRestaurantsLazy();

  const handleSearch = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (inputState.length === 0) {
      const params = deleteUrlParams("keyword");
      navigate({ search: params });
    } else {
      const params = setParams("keyword", inputState);
      navigate({ search: params });
    }

    getRestaurants(location.search);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      if (inputState.length === 0) {
        const params = deleteUrlParams("keyword");
        navigate({ search: params });
      } else {
        const params = setParams("keyword", e.target.value);
        navigate({ search: params });
      }

      getRestaurants(location.search);
    }, 750);

    setTimer(newTimer);
  };

  const handleClearInput = () => {
    const params = deleteUrlParams("keyword");
    navigate({ search: params });

    setInputState("");
    getRestaurants(location.search);
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
          onChange={handleChange}
        />{" "}
        {inputState.length > 0 && (
          <button
            type="button"
            className="absolute top-[50%] right-2 translate-y-[-50%] text-xl text-gray-600 dark:text-white"
            onClick={handleClearInput}
          >
            <MdOutlineClose />
          </button>
        )}{" "}
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
