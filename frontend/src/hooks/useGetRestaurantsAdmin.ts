import { useGetRestaurantsAdminQuery } from "../services/restaurantsApi";
import { setRestaurants } from "../redux/restaurantsSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";

type FunctionParameters = {
  keyword?: string;
  filters?: string;
};

function useGetRestaurantsAdmin({ keyword, filters }: FunctionParameters) {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, error, isSuccess } = useGetRestaurantsAdminQuery({
    keyword,
    filters,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setRestaurants(data));
    }
  }, [isSuccess]);

  return { isLoading, isError, error };
}

export default useGetRestaurantsAdmin;
