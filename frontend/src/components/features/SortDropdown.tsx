import React from "react";
import Select from "./SelectDropdown";
import { sortRestaurants } from "../../redux/restaurantsSlice";
import { useAppDispatch } from "../../redux/store";

function SortDropdown() {
  const dispatch = useAppDispatch();

  const handleSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(sortRestaurants(event.currentTarget.value as "Alfabetycznie (A-Z)" | "Alfabetycznie (Z-A)" | "Ocena: malejąco" | "Ocena: rosnąco"));
  };

  return (
    <div className="flex flex-col gap-1 w-1/2">
      <span className="text-gray-500 dark:text-gray-300">Sortuj</span>
      <Select defaultValue="Alfabetycznie (A-Z)" className="w-full border border-gray-300 px-1 py-1 rounded-md outline-none">
        <Select.Option value="Alfabetycznie (A-Z)" handleSort={handleSort}>
          Alfabetycznie (A-Z)
        </Select.Option>
        <Select.Option value="Alfabetycznie (Z-A)" handleSort={handleSort}>
          Alfabetycznie (Z-A)
        </Select.Option>
        <Select.Option value="Ocena: malejąco" handleSort={handleSort}>
          Ocena: malejąco
        </Select.Option>
        <Select.Option value="Ocena: rosnąco" handleSort={handleSort}>
          Ocena: rosnąco
        </Select.Option>
      </Select>
    </div>
  );
}

export default SortDropdown;
