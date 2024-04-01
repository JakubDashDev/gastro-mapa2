import { RestaurantType } from "../redux/restaurantsSlice";
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
    createRestaurants: builder.mutation({
      query: (data: RestaurantType) => ({
        url: "http://localhost:3000/api/restaurants",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetRestaurantsQuery, useLazyGetRestaurantsQuery, useGetRestaurantsAdminQuery, useLazyGetRestaurantsAdminQuery, useCreateRestaurantsMutation } = restaurantsApi;
