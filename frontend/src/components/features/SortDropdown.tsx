import React from "react";
import Select from "./SelectDropdown";
import setParams from "../../utils/setUrlParams";
import { useNavigate } from "react-router-dom";
import useGetRestaurantsLazy from "../../hooks/useGetRestaurantsLazy";
import Loader from "../ui/Loader";
import getParams from "../../utils/getUrlParams";

function SortDropdown() {
  const navigate = useNavigate();
  const { sort } = getParams(location);

  const { getRestaurants, isLoading, error, isError, isSuccess, isFetching } = useGetRestaurantsLazy();

  const handleSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    const params = setParams("sort", JSON.stringify(event.currentTarget.value));
    navigate({ search: params });

    getRestaurants(location.search);
  };

  return (
    <div className="flex flex-col gap-1 w-1/2">
      <span className="text-gray-500 dark:text-gray-300">Sortuj</span>
      {isFetching ? (
        <div className="w-full flex items-center justify-center border border-gray-300 px-1 py-1 rounded-md">
          <Loader />
        </div>
      ) : (
        <Select
          defaultValue={sort ? JSON.parse(sort) : "Od: najnowszych"}
          className="w-full border border-gray-300 px-1 py-1 rounded-md outline-none"
        >
          <Select.Option value="Alfabetycznie (A-Z)" handleClick={handleSort}>
            Alfabetycznie (A-Z)
          </Select.Option>
          <Select.Option value="Alfabetycznie (Z-A)" handleClick={handleSort}>
            Alfabetycznie (Z-A)
          </Select.Option>
          <Select.Option value="Ocena: malejąco" handleClick={handleSort}>
            Ocena: malejąco
          </Select.Option>
          <Select.Option value="Ocena: rosnąco" handleClick={handleSort}>
            Ocena: rosnąco
          </Select.Option>
          <Select.Option value="Od: najnowszych" handleClick={handleSort}>
            Od: najnowszych
          </Select.Option>
          <Select.Option value="Od: najstarszych" handleClick={handleSort}>
            Od: najstarszych
          </Select.Option>
        </Select>
      )}
    </div>
  );
}

export default SortDropdown;
