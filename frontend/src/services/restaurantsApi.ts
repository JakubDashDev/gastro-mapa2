import { RestaurantType } from "../redux/restaurantsSlice";
import { apiSlice } from "./apiSlice";

type QueryType = {
  keyword?: string;
  filters?: string;
};

export const restaurantsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query({
      query: (query: string) => ({
        url: `/api/restaurants/${query}`,
        method: "GET",
      }),
      providesTags: [{ type: "Restaurant", id: "LIST" }],
    }),
    getRestaurantsAdmin: builder.query({
      query: (query: string) => ({
        url: `/api/restaurants/admin/${query}`,
        method: "GET",
      }),
      providesTags: [{ type: "Restaurant", id: "LIST" }],
    }),
    createRestaurants: builder.mutation({
      query: (data: RestaurantType) => ({
        url: "/api/restaurants",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Restaurant", id: "LIST" }],
    }),
    updateRestaurant: builder.mutation({
      query: (data: any) => ({
        url: `/api/restaurants/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "Restaurant", id: "LIST" }],
    }),
    deleteRestaurant: builder.mutation({
      query: (_id: string) => ({
        url: `/api/restaurants/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Restaurant", id: "LIST" }],
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
