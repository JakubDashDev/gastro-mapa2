import { fetchBaseQuery, createApi, BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constatns";
import { removeAuth } from "../redux/authSlice";

interface CustomError {
  data: {
    message: string;
    stack: string;
  };
  status: number;
}

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

async function baseQueryWithAuth(args: any, api: any, extra: any) {
  const result = await baseQuery(args, api, extra);
  // Dispatch the logout action on 401.
  if (result.error && result.error.status === 401) {
    api.dispatch(removeAuth());
  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
  endpoints: () => ({}),
});
