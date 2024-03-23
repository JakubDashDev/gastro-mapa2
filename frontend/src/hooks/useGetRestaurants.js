import { useDispatch } from 'react-redux';
import {
  useGetRestaurantsQuery,
  useLazyGetRestaurantsQuery,
} from '../services/restaurantsApi';
import { setRestaurants } from '../redux/restaurantsSlice';
import { useEffect } from 'react';

function useGetRestaurants({ keyword, filters }) {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useGetRestaurantsQuery({
    keyword,
    filters,
  });

  useEffect(() => {
    dispatch(setRestaurants(data));
  }, [data]);

  return { isLoading, isError, error };
}

export default useGetRestaurants;
