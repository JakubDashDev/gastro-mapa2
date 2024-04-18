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
      query: (data: any) => ({
        url: "http://localhost:3000/api/restaurants",
        method: "POST",
        body: data,
      }),
    }),
    updateRestaurant: builder.mutation({
      query: (data: any) => ({
        url: `http://localhost:3000/api/restaurants/${data._id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteRestaurant: builder.mutation({
      query: (_id: string) => ({
        url: `http://localhost:3000/api/restaurants/${_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useLazyGetRestaurantsQuery,
  useGetRestaurantsAdminQuery,
  useLazyGetRestaurantsAdminQuery,
  useCreateRestaurantsMutation,
  useUpdateRestaurantMutation,
  useDeleteRestaurantMutation,
} = restaurantsApi;
