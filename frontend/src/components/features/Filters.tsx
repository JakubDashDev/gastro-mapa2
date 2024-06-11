import React, { useEffect, useState } from "react";
import { RATING_ARRAY, CATEGORY_ARRAY } from "../../../constatns";
import Rating from "../ui/Rating";
import useGetRestaurantsLazy from "../../hooks/useGetRestaurantsLazy";
import { useTransition, animated } from "@react-spring/web";
import { useAppDispatch } from "../../redux/store";
import PromiseButton from "../ui/PromiseButton";
import Loader from "../ui/Loader";
import { useNavigate } from "react-router-dom";
import setParams from "../../utils/setUrlParams";
import deleteUrlParams from "../../utils/deleteUrlParams";
import getParams from "../../utils/getUrlParams";

type FiltersProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function Filters({ setIsOpen }: FiltersProps) {
  const navigate = useNavigate();

  const { filtersQuery } = getParams(location);
  const filters = filtersQuery && JSON.parse(filtersQuery);

  const { getRestaurants, isLoading, error, isError, isSuccess, isFetching } = useGetRestaurantsLazy();

  const [filtersState, setFiltersState] = useState<any>(filters || []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (filtersState.length > 0) {
      const params = setParams("filters", JSON.stringify(filtersState));
      navigate({ search: params });
    } else {
      const params = deleteUrlParams("filters");
      navigate({ search: params });
    }

    getRestaurants(location.search);
  };

  useEffect(() => {
    if (!isLoading && !isError && !isFetching && isSuccess) {
      setIsOpen((current) => !current);
    }
  }, [isSuccess, isLoading, isError, isFetching]);

  const handleClear = () => {
    const params = deleteUrlParams("filters");

    navigate({ search: params });
    getRestaurants(location.search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <RatingFilterSection isLoading={isLoading} setFiltersState={setFiltersState} filtersState={filtersState} />

      <CategoryFilterSection isLoading={isLoading} setFiltersState={setFiltersState} filtersState={filtersState} />

      {isError && (
        <div className="w-full border border-red-500 my-3 p-2 rounded-lg bg-red-900/40">
          {error && "data" in error ? error.data.message : "Wystąpił nieoczekiwany błąd aplikacji"}
        </div>
      )}
      <div className="flex flex-row gap-3 w-full mt-5">
        <PromiseButton
          disabled={isLoading}
          type="submit"
          status={isFetching ? "loading" : isError ? "error" : null}
          className="w-full bg-primary-500 hover:bg-primary-400 rounded-md"
        >
          Zastosuj
        </PromiseButton>
        <button
          type="button"
          className="w-full flex items-center justify-center sm:w-1/2 py-1 rounded-md border border-gray-500 disabled:border-gray-300 disabled:dark:border-gray-700 transition-colors dark:disabled:text-gray-700 disabled:text-gray-300"
          onClick={handleClear}
          disabled={filtersState.length === 0 || isLoading}
        >
          {isFetching ? <Loader color="gray-500" colorDark="gray-200" /> : "Wyczyść"}
        </button>
      </div>
    </form>
  );
}

export default Filters;

interface FilterButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string | number;
  setFilertsState: React.Dispatch<any>;
  filtersState: any;
}

function FilterButton({ value, setFilertsState, filtersState, disabled }: FilterButtonType) {
  const { filtersQuery } = getParams(location);
  const filters = filtersQuery && JSON.parse(filtersQuery);
  const initialValue = filters ? filters.some((item: any) => item.$gte === value || item.category === value) : false;
  const [checked, setChecked] = useState<boolean>(initialValue);

  const handleClick = () => {
    const condition = filtersState.some((item: any) => item.$gte === value || item.category === value);

    if (RATING_ARRAY.includes(value) && !condition) {
      //NOTE: handling custom value of rating
      if (value === "challange ostrości") {
        setFilertsState((current: any) => [...current, { $gte: value, $lte: value }]);
      } else {
        setFilertsState((current: any) => [...current, { $gte: value, $lte: (value as number) + 0.9 }]);
      }
    }

    if (RATING_ARRAY.includes(value) && condition) {
      setFilertsState((current: any) => current.filter((item: any) => item.$gte !== value));
    }

    if (CATEGORY_ARRAY.includes(value as string) && !condition) {
      setFilertsState((current: any) => [...current, { category: value }]);
    }

    if (CATEGORY_ARRAY.includes(value as string) && condition) {
      setFilertsState((current: any) => current.filter((item: any) => item.category !== value));
    }
    setChecked((current) => !current);
  };

  return (
    <label
      htmlFor={value.toString()}
      className="flex items-center gap-2 my-1 w-fit cursor-pointer accent-black-100 border-white capitalize "
    >
      <input
        type="checkbox"
        name={value.toString()}
        id={value.toString()}
        value={value}
        className="scale-125"
        disabled={disabled}
        checked={checked}
        onChange={handleClick}
      />
      {RATING_ARRAY.includes(value) ? <Rating rating={value} color="text-gray-600 dark:text-gray-200" /> : value}
    </label>
  );
}

type FilterSectionProps = {
  isLoading: boolean;
  setFiltersState: React.Dispatch<any>;
  filtersState: any;
};

function RatingFilterSection({ isLoading, setFiltersState, filtersState }: FilterSectionProps) {
  const [isShow, setIsShow] = useState(false);
  const { filtersQuery } = getParams(location);
  const ratingFilters = filtersQuery && JSON.parse(filtersQuery).filter((item: any) => item.hasOwnProperty("$gte"));

  const transition = useTransition(isShow, {
    from: { height: "0px", opacity: 0, marginBottom: "0px", marginTop: "0px" },
    enter: {
      height: "185px",
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
          {ratingFilters.length > 0 && <span className="text-red-500 text-sm">({ratingFilters.length})</span>}
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
                  <FilterButton
                    key={rating}
                    value={rating}
                    disabled={isLoading}
                    setFilertsState={setFiltersState}
                    filtersState={filtersState}
                  />
                ))}
              </animated.div>
            </div>
          )
      )}
    </section>
  );
}

function CategoryFilterSection({ isLoading, setFiltersState, filtersState }: FilterSectionProps) {
  const [isShow, setIsShow] = useState(false);
  const { filtersQuery } = getParams(location);
  const categoryFilters =
    filtersQuery && JSON.parse(filtersQuery).filter((item: any) => item.hasOwnProperty("category"));

  const transition = useTransition(isShow, {
    from: { height: "0px", opacity: 0, marginBottom: "0px", marginTop: "0px" },
    enter: {
      height: "600px",
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
          {categoryFilters.length > 0 && <span className="text-red-500 text-sm">({categoryFilters.length})</span>}
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
                  <FilterButton
                    key={type}
                    value={type}
                    disabled={isLoading}
                    setFilertsState={setFiltersState}
                    filtersState={filtersState}
                  />
                ))}
              </animated.div>
            </div>
          )
      )}
    </section>
  );
}
