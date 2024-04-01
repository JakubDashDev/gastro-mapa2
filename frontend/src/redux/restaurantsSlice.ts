import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type RestaurantType = {
  _id?: string;
  name: string;
  rating: number;
  address: {
    street: string;
    zipCode: string;
    city: string;
    country: string;
    latLng: number[];
  };
  category: string[];
  youtubeEmbed?: string;
  youtubeLink: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type SliceState = {
  restaurants: RestaurantType[];
};

const initialState: SliceState = {
  restaurants: [],
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<RestaurantType[]>) => {
      state.restaurants = action.payload;
    },
    updateRestaurants: (state, action: PayloadAction<RestaurantType>) => {
      return {
        ...state,
        restaurants: [...state.restaurants, action.payload],
      };
    },
    sortRestaurants: (state, action: PayloadAction<String>) => {
      if (action.payload === "Alfabetycznie (A-Z)") {
        state.restaurants = state.restaurants.slice().sort((a, b) => a.name.localeCompare(b.name));
      }
      if (action.payload === "Alfabetycznie (Z-A)") {
        state.restaurants = state.restaurants.slice().sort((a, b) => -1 * a.name.localeCompare(b.name));
      }
      if (action.payload === "Ocena: malejąco") {
        state.restaurants = state.restaurants.slice().sort((a, b) => a.rating - b.rating);
      }
      if (action.payload === "Ocena: rosnąco") {
        state.restaurants = state.restaurants.slice().sort((a, b) => b.rating - a.rating);
      }
    },
  },
});

export const { setRestaurants, sortRestaurants, updateRestaurants } = restaurantSlice.actions;

export default restaurantSlice.reducer;
