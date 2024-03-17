import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice';
import restaurantsSlice from './restaurantsSlice';
import filtersSlice from './filtersSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    restaurants: restaurantsSlice,
    filters: filtersSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware);
  },
});

export default store;
