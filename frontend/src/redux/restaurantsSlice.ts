import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Restaurant = {
  _id: string;
  name: string;
  rating: number;
  address: {
    street: string;
    houseNumber: number;
    zipCode: string;
    city: string;
    country: string;
  };
  latlng: {
    lat: number;
    lng: number;
  };
  category: string[];
  youtubeRef: string;
  createdAt: Date;
  updatedAt: Date;
};

type SliceState = {
  restaurants: Restaurant[];
};

const initialState: SliceState = {
  restaurants: [],
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.restaurants = action.payload;
    },
    sortRestaurants: (state, action: PayloadAction<String>) => {
      if (action.payload === "Alfabetycznie (A-Z)") {
        state.restaurants = state.restaurants
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name));
      }
      if (action.payload === "Alfabetycznie (Z-A)") {
        state.restaurants = state.restaurants
          .slice()
          .sort((a, b) => -1 * a.name.localeCompare(b.name));
      }
      if (action.payload === "Ocena: malejąco") {
        state.restaurants = state.restaurants
          .slice()
          .sort((a, b) => a.rating - b.rating);
      }
      if (action.payload === "Ocena: rosnąco") {
        state.restaurants = state.restaurants
          .slice()
          .sort((a, b) => b.rating - a.rating);
      }
    },
  },
});

export const { setRestaurants, sortRestaurants } = restaurantSlice.actions;

export default restaurantSlice.reducer;
