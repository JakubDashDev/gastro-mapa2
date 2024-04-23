import React, { useEffect, useState } from "react";
import { RATING_ARRAY, CATEGORY_ARRAY } from "../../../constatns";
import Rating from "../ui/Rating";
import { useDispatch, useSelector } from "react-redux";
import { clearFilterQuery, setIsActive, updateFilterQuery } from "../../redux/filtersSlice";
import useGetRestaurantsLazy from "../../hooks/useGetRestaurantsLazy";
import { useTransition, animated } from "@react-spring/web";
import { useAppDispatch, useAppSelector } from "../../redux/store";

type FiltersProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function Filters({ setIsOpen }: FiltersProps) {
  const dispatch = useAppDispatch();
  const { filterQuery } = useAppSelector((state) => state.filters);
  const { getRestaurants, isLoading, error } = useGetRestaurantsLazy();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getRestaurants({
      keyword: undefined,
      filters: JSON.stringify(filterQuery),
    });

    filterQuery.length > 0 ? dispatch(setIsActive(true)) : dispatch(setIsActive(false));
    setIsOpen((current) => !current);
  };

  const handleClear = () => {
    dispatch(clearFilterQuery());
    getRestaurants({
      keyword: undefined,
      filters: undefined,
    });

    dispatch(setIsActive(false));
  };

  return (
    <form onSubmit={handleSubmit}>
      <RatingFilterSection isLoading={isLoading} />

      <CategoryFilterSection isLoading={isLoading} />

      <div className="flex flex-row gap-3 w-full mt-5">
        <button type="submit" className="w-full sm:w-1/2 bg-primary-500 py-1 rounded-md text-white">
          Zastosuj
        </button>
        <button
          type="button"
          className="w-full sm:w-1/2 py-1 text-gray-200 disabled:text-gray-600 rounded-md border border-gray-600 dark:border-gray-300 dark:disabled:border-gray-600 transition-colors"
          onClick={handleClear}
          disabled={filterQuery.length === 0}
        >
          Wyczyść
        </button>
      </div>
    </form>
  );
}

export default Filters;

interface FilterButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string | number;
}

function FilterButton({ value, disabled }: FilterButtonType) {
  const dispatch = useAppDispatch();
  const { filterQuery } = useAppSelector((state) => state.filters);

  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    dispatch(updateFilterQuery(value));
  };

  useEffect(() => {
    const condition = filterQuery.some((item) => item.$gte === value || item.category === value);

    setChecked(condition);
  }, [filterQuery]);

  return (
    <label
      htmlFor={value.toString()}
      className="flex items-center gap-2 my-1 w-fit cursor-pointer accent-black-100 dark:accent-white border-white capitalize "
    >
      <input
        type="checkbox"
        name={value.toString()}
        id={value.toString()}
        value={value}
        className="scale-125"
        onChange={handleClick}
        disabled={disabled}
        checked={checked}
      />
      {RATING_ARRAY.includes(value) ? <Rating rating={value} color="text-gray-600 dark:text-gray-200" /> : value}
    </label>
  );
}

type FilterSectionProps = {
  isLoading: boolean;
};

function RatingFilterSection({ isLoading }: FilterSectionProps) {
  const [isShow, setIsShow] = useState(false);

  const { filterQuery } = useAppSelector((state) => state.filters);

  const ratingQuery = filterQuery.filter((item) => item.hasOwnProperty("$gte"));

  const transition = useTransition(isShow, {
    from: { height: "0px", opacity: 0, marginBottom: "0px", marginTop: "0px" },
    enter: {
      height: "175px",
      opacity: 1,
      marginBottom: "20px",
      marginTop: "10px",
    },
    leave: { height: "0px", opacity: 0, marginBottom: "0px", marginTop: "0px" },
  });

  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between w-full border-b text-lg">
        <div className="flex gap-1">
          <span>Ocena</span>
          {ratingQuery.length > 0 && <span className="text-red-500 text-sm">({ratingQuery.length})</span>}
        </div>
        <button
          type="button"
          className="text-2xl text-blue-600 dark:text-blue-300"
          onClick={() => setIsShow((current) => !current)}
        >
          +
        </button>
      </div>
      {transition(
        (styles, item) =>
          item && (
            <div className="overflow-hidden">
              <animated.div style={styles} className="flex flex-col gap-1 px-1">
                {RATING_ARRAY.map((rating) => (
                  <FilterButton key={rating} value={rating} disabled={isLoading} />
                ))}
              </animated.div>
            </div>
          )
      )}
    </section>
  );
}

function CategoryFilterSection({ isLoading }: FilterSectionProps) {
  const [isShow, setIsShow] = useState(false);
  const { filterQuery } = useAppSelector((state) => state.filters);

  const ratingQuery = filterQuery.filter((item) => item.hasOwnProperty("category"));

  const transition = useTransition(isShow, {
    from: { height: "0px", opacity: 0, marginBottom: "0px", marginTop: "0px" },
    enter: {
      height: "400px",
      opacity: 1,
      marginBottom: "20px",
      marginTop: "10px",
    },
    leave: { height: "0px", opacity: 0, marginBottom: "0px", marginTop: "0px" },
  });

  return (
    <section className="flex flex-col mt-5">
      <div className="flex items-center justify-between w-full border-b text-lg">
        <div className="flex gap-1">
          <span>Kategoria</span>
          {ratingQuery.length > 0 && <span className="text-red-500 text-sm">({ratingQuery.length})</span>}
        </div>
        <button
          type="button"
          className="text-2xl text-blue-600 dark:text-blue-300"
          onClick={() => setIsShow((current) => !current)}
        >
          +
        </button>
      </div>
      {transition(
        (styles, item) =>
          item && (
            <div className="overflow-hidden">
              <animated.div style={styles} className="flex flex-col gap-1 px-1">
                {CATEGORY_ARRAY.sort((a, b) => a.localeCompare(b)).map((type) => (
                  <FilterButton key={type} value={type} disabled={isLoading} />
                ))}
              </animated.div>
            </div>
          )
      )}
    </section>
  );
}
