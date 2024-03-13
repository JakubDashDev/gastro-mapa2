import { createSlice } from '@reduxjs/toolkit';

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState: { restaurants: [] },
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
  },
});

export const { setRestaurants, sortRestaurants } = restaurantSlice.actions;

export default restaurantSlice.reducer;
