import { useDispatch } from 'react-redux';
import { useLazyGetRestaurantsQuery } from '../services/restaurantsApi';
import { setRestaurants } from '../redux/restaurantsSlice';

function useGetRestaurants() {
  const dispatch = useDispatch();
  const [trigger, { isLoading, error }] = useLazyGetRestaurantsQuery();

  const getRestaurants = ({ keyword }) => {
    trigger({ keyword }).then((res) => dispatch(setRestaurants(res.data)));
  };

  return { getRestaurants, isLoading, error };
}

export default useGetRestaurants;
