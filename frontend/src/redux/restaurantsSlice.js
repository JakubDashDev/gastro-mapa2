import { createSlice } from '@reduxjs/toolkit';

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState: { restaurants: [], filterQuery: [] },
  reducers: {
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    sortRestaurants: (state, action) => {
      if (action.payload === 'Alfabetycznie (A-Z)') {
        state.restaurants = state.restaurants
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name));
      }
      if (action.payload === 'Alfabetycznie (Z-A)') {
        state.restaurants = state.restaurants
          .slice()
          .sort((a, b) => -1 * a.name.localeCompare(b.name));
      }
      if (action.payload === 'Ocena: malejąco') {
        state.restaurants = state.restaurants
          .slice()
          .sort((a, b) => a.rating - b.rating);
      }
      if (action.payload === 'Ocena: rosnąco') {
        state.restaurants = state.restaurants
          .slice()
          .sort((a, b) => b.rating - a.rating);
      }
    },
    updateFilterQuery: (state, action) => {
      const condition = state.filterQuery.some(
        (item) =>
          item.$gte === action.payload || item.category === action.payload
      );

      if (typeof action.payload === 'number' && !condition) {
        return {
          ...state,
          filterQuery: [
            ...state.filterQuery,
            { $gte: action.payload, $lte: action.payload + 0.9 },
          ],
        };
      }

      if (typeof action.payload === 'string' && !condition) {
        return {
          ...state,
          filterQuery: [...state.filterQuery, { category: action.payload }],
        };
      }

      if (typeof action.payload === 'number' && condition) {
        return {
          ...state,
          filterQuery: state.filterQuery.filter(
            (item) => item.$gte !== action.payload
          ),
        };
      }

      if (typeof action.payload === 'string' && condition) {
        return {
          ...state,
          filterQuery: state.filterQuery.filter(
            (item) => item.category !== action.payload
          ),
        };
      }
    },
    clearFilterQuery: (state, action) => {
      state.filterQuery = [];
    },
  },
});

export const {
  setRestaurants,
  sortRestaurants,
  updateFilterQuery,
  clearFilterQuery,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
