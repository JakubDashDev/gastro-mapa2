import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware);
  },
});

export default store;
