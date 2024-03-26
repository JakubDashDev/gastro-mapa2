import { useDispatch } from "react-redux";
import { useGetRestaurantsAdminQuery } from "../services/restaurantsApi";
import { setRestaurants } from "../redux/restaurantsSlice";
import { useEffect } from "react";

type FunctionParameters = {
  keyword?: string;
  filters?: string;
};

function useGetRestaurantsAdmin({ keyword, filters }: FunctionParameters) {
  const dispatch = useDispatch();
  const { data, isLoading, isError, error } = useGetRestaurantsAdminQuery({
    keyword,
    filters,
  });

  useEffect(() => {
    dispatch(setRestaurants(data));
  }, [data]);

  return { isLoading, isError, error };
}

export default useGetRestaurantsAdmin;
