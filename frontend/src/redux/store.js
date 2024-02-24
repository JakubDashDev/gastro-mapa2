import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice';
import restaurantsSlice from './restaurantsSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    restaurants: restaurantsSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware);
  },
});

export default store;
