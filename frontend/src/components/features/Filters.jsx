import React, { useEffect, useState } from 'react';
import { RATING_ARRAY, CATEGORY_ARRAY } from '../../../constatns';
import Rating from '../ui/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetRestaurantsQuery } from '../../services/restaurantsApi';
import {
  clearFilterQuery,
  setRestaurants,
  updateFilterQuery,
} from '../../redux/restaurantsSlice';
import useGetRestaurants from '../../hooks/useGetRestaurants';
function Filters({ setIsOpen }) {
  const { filterQuery } = useSelector((state) => state.restaurants);
  const { getRestaurants, isLoading, error } = useGetRestaurants();

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    getRestaurants({
      keyword: undefined,
      filters: JSON.stringify(filterQuery),
    });

    setIsOpen((current) => !current);
  };

  const handleClear = () => {
    dispatch(clearFilterQuery());
    getRestaurants({
      keyword: undefined,
      filters: undefined,
    });
    setIsOpen((current) => !current);
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="flex flex-col gap-2 ">
        <div className="flex justify-between items-center w-full border-b text-lg">
          <span>Ocena</span>
          <button
            type="button"
            onClick={handleClear}
            className="text-sm text-blue-700 underline"
          >
            Wyczyść wszystko
          </button>
        </div>
        {RATING_ARRAY.map((rating) => (
          <FilterButton
            key={rating}
            value={rating}
            disabled={isLoading}
            handleClear={handleClear}
          />
        ))}
      </section>

      <section className="flex flex-col gap-2 mt-5">
        <span className="w-full border-b text-lg">Kategoria</span>
        {CATEGORY_ARRAY.sort((a, b) => a.localeCompare(b)).map((type) => (
          <FilterButton key={type} value={type} disabled={isLoading} />
        ))}
      </section>

      <div className="flex flex-col gap-4 w-full mt-5">
        <button
          type="submit"
          className="bg-primary-500 py-1 rounded-md hover:text-white transition-colors"
        >
          Zastosuj
        </button>
        <button type="button" onClick={() => setIsOpen((current) => !current)}>
          Anuluj
        </button>
      </div>
    </form>
  );
}

export default Filters;

function FilterButton({ value, disabled }) {
  const dispatch = useDispatch();
  const { filterQuery } = useSelector((state) => state.restaurants);

  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    dispatch(updateFilterQuery(value));
  };

  useEffect(() => {
    const condition = filterQuery.some(
      (item) => item.$gte === value || item.category === value
    );

    setChecked(condition);
  }, [filterQuery]);

  return (
    <label
      htmlFor={value}
      className="flex items-center gap-2 my-1  w-fit cursor-pointer"
    >
      <input
        type="checkbox"
        name={value}
        id={value}
        value={value}
        className="scale-125"
        onChange={handleClick}
        disabled={disabled}
        checked={checked}
      />
      {typeof value === 'number' ? (
        <Rating rating={value} color="text-gray-600" />
      ) : (
        value
      )}
    </label>
  );
}
