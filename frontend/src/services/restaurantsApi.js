import { RESTAURANT_URL } from '../../constatns';
import { apiSlice } from './apiSlice';

export const restaurantsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query({
      query: ({ keyword, filters }) => ({
        url: `http://localhost:3000/api/restaurants`,
        method: 'GET',
        params: { keyword, filters },
      }),
    }),
  }),
});

export const { useGetRestaurantsQuery, useLazyGetRestaurantsQuery } =
  restaurantsApi;
