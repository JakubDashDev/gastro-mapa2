import { apiSlice } from "./apiSlice";

type QueryType = {
  keyword?: string;
  filters?: string;
};

export const restaurantsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query({
      query: ({ keyword, filters }: QueryType) => ({
        url: `http://localhost:3000/api/restaurants`,
        method: "GET",
        params: { keyword, filters },
      }),
    }),
    getRestaurantsAdmin: builder.query({
      query: ({ keyword, filters }: QueryType) => ({
        url: `http://localhost:3000/api/restaurants/admin`,
        method: "GET",
        params: { keyword, filters },
      }),
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useLazyGetRestaurantsQuery,
  useGetRestaurantsAdminQuery,
  useLazyGetRestaurantsAdminQuery,
} = restaurantsApi;
