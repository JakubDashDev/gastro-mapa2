import React, { useEffect, useState } from 'react';
import { MdOutlineClose, MdOutlineSearch } from 'react-icons/md';
import { useLazyGetRestaurantsQuery } from '../../services/restaurantsApi';
import { useDispatch } from 'react-redux';
import { setRestaurants } from '../../redux/restaurantsSlice';
import useGetRestaurants from '../../hooks/useGetRestaurants';

function Search() {
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState('');
  const [isCustomText, setIsCustomText] = useState(false);

  useEffect(() => {
    if (inputState.toLowerCase() === 'muala') {
      setIsCustomText(true);
    } else {
      setIsCustomText(false);
    }
  }, [inputState]);

  // const [getRestaurants, { isLoading, error }] = useLazyGetRestaurantsQuery();

  const { getRestaurants, isLoading, error } = useGetRestaurants();

  const handleSearch = (event) => {
    event.preventDefault();
    getRestaurants({ keyword: inputState });
  };

  const handleClearInput = () => {
    setInputState('');
    getRestaurants({ keyword: undefined });
  };
  return (
    <form className="relative py-1" onSubmit={handleSearch}>
      <MdOutlineSearch className="absolute top-[50%] left-2 translate-y-[-50%] text-xl text-gray-400" />
      <input
        className={`w-full bg-gray-200 py-2 px-8 rounded-lg outline-none ${
          isCustomText ? 'text-primary-500 font-loader pt-3' : 'text-black font-sans'
        }`}
        placeholder="Wyszukaj..."
        value={inputState}
        onChange={(e) => setInputState(e.target.value)}
      />
      {inputState.length > 0 && (
        <button
          type="button"
          className="absolute top-[50%] right-2 translate-y-[-50%] text-xl"
          onClick={handleClearInput}
        >
          <MdOutlineClose />
        </button>
      )}
    </form>
  );
}

export default Search;
