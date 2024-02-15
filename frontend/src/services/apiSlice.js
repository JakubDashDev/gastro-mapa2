import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constatns';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

async function baseQueryWithAuth(args, api, extra) {
  const result = await baseQuery(args, api, extra);
  // Dispatch the logout action on 401.
  if (result.error && result.error.status === 401) {
    // api.dispatch(logout());
    console.log("error 401")
  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
});
