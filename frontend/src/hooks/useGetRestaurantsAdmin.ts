import { useGetRestaurantsAdminQuery } from "../services/restaurantsApi";
import { setRestaurants } from "../redux/restaurantsSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/store";

type FunctionParameters = {
  keyword?: string;
  filters?: string;
};

function useGetRestaurantsAdmin({ keyword, filters }: FunctionParameters) {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, error } = useGetRestaurantsAdminQuery({
    keyword,
    filters,
  });

  useEffect(() => {
    if (data) {
      dispatch(setRestaurants(data));
    }
  }, [data]);

  return { isLoading, isError, error };
}

export default useGetRestaurantsAdmin;
