import { useDispatch } from 'react-redux';
import { useLazyGetRestaurantsQuery } from '../services/restaurantsApi';
import { setRestaurants } from '../redux/restaurantsSlice';

function useGetRestaurantsLazy() {
  const dispatch = useDispatch();
  const [trigger, { isLoading, error }] = useLazyGetRestaurantsQuery();

  const getRestaurants = (credentials) => {
    trigger(credentials).then((res) => dispatch(setRestaurants(res.data)));
  };

  return { getRestaurants, isLoading, error };
}

export default useGetRestaurantsLazy;
