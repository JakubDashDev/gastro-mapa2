import { useDispatch } from "react-redux";
import { useLazyGetRestaurantsQuery } from "../services/restaurantsApi";
import { setRestaurants } from "../redux/restaurantsSlice";

type Credentials = {
  keyword?: string;
  filters?: string;
};

function useGetRestaurantsLazy() {
  const dispatch = useDispatch();
  const [trigger, { isLoading, error, isError, isSuccess, isFetching }] = useLazyGetRestaurantsQuery();

  const getRestaurants = (query: string) => {
    trigger(query).then((res) => dispatch(setRestaurants(res.data)));
  };

  return { getRestaurants, isLoading, error, isError, isSuccess, isFetching };
}

export default useGetRestaurantsLazy;
