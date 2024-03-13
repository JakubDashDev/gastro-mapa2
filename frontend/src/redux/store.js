import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice';
import restaurantsSlice from './restaurantsSlice';
import filtersSlice from './filtersSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    restaurants: restaurantsSlice,
    filters: filtersSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware);
  },
});

export default store;
