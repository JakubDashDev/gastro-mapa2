import React, { Fragment, useState } from 'react';
import { RATING_ARRAY, CATEGORY_ARRAY } from '../../../constatns';
import { FaStar } from 'react-icons/fa';
import Rating from '../ui/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import { useLazyGetRestaurantsQuery } from '../../services/restaurantsApi';
import { setRestaurants } from '../../redux/restaurantsSlice';

function Filters({ setIsOpen }) {
  const dispatch = useDispatch();
  const [ratingQuery, setRatingQuery] = useState([]);
  const [getRestaurants, { isLoading, error }] = useLazyGetRestaurantsQuery();

  const handleSubmit = (event) => {
    event.preventDefault();
    getRestaurants({
      keyword: undefined,
      filters: JSON.stringify(ratingQuery),
    })
      .then((res) => dispatch(setRestaurants(res.data)))
      .catch((err) => alert(err.message));
  };

  const handleClear = () => {
    document
      .querySelectorAll('input[type=checkbox]')
      .forEach((el) => (el.checked = false));
    setRatingQuery([]);
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
            setRatingQuery={setRatingQuery}
            ratingQuery={ratingQuery}
            disabled={isLoading}
          />
        ))}
      </section>

      <section className="flex flex-col gap-2 mt-5">
        <span className="w-full border-b text-lg">Kategoria</span>
        {CATEGORY_ARRAY.sort((a, b) => a.localeCompare(b)).map((type) => (
          <FilterButton
            key={type}
            value={type}
            setRatingQuery={setRatingQuery}
            ratingQuery={ratingQuery}
            disabled={isLoading}
          />
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

function FilterButton({ value, ratingQuery, setRatingQuery, disabled }) {
  const handleClick = () => {
    if (typeof value === 'number') {
      ratingQuery.some((item) => item.value.$gte === value)
        ? setRatingQuery((current) =>
            current.filter((item) => item.value.$gte !== value)
          )
        : setRatingQuery((current) => [
            ...current,
            { type: 'rating', value: { $gte: value, $lte: value + 0.9 } },
          ]);
    } else {
      ratingQuery.some((item) => item.value === value)
        ? setRatingQuery((current) =>
            current.filter((item) => item.value !== value)
          )
        : setRatingQuery((current) => [
            ...current,
            { type: 'category', value },
          ]);
    }
  };

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
        onClick={handleClick}
        disabled={disabled}
      />
      {typeof value === 'number' ? (
        <Rating rating={value} color="text-gray-600" />
      ) : (
        value
      )}
    </label>
  );
}
