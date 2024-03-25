import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/apiSlice";
import restaurantsSlice from "./restaurantsSlice";
import filtersSlice from "./filtersSlice";
import authSlice from "./authSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
