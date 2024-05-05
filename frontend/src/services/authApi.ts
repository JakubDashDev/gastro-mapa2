import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/admin/auth",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/admin/logout",
        method: "POST",
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/api/admin/updatePassword",
        method: "PATCH",
        body: data,
      }),
    }),
    updateMe: builder.mutation({
      query: (data) => ({
        url: "/api/admin/updateMe",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useUpdatePasswordMutation, useUpdateMeMutation } = authApi;
