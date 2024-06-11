import { useGetRestaurantsAdminQuery } from "../services/restaurantsApi";
import { setRestaurants } from "../redux/restaurantsSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";

function useGetRestaurantsAdmin() {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, error, isSuccess, isFetching } = useGetRestaurantsAdminQuery(location.search);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setRestaurants(data));
    }
  }, [isSuccess]);

  return { isLoading, isError, error, isFetching };
}

export default useGetRestaurantsAdmin;
