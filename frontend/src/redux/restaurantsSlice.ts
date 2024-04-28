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
    lngLat: number[];
  };
  category: string[];
  youtubeEmbed?: string;
  youtubeLink: string;
  googleLink: string;
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
      return {
        ...state,
        restaurants: action.payload,
      };
    },
    updateRestaurants: (state, action: PayloadAction<RestaurantType>) => {
      return {
        ...state,
        restaurants: [...state.restaurants, action.payload],
      };
    },
    updateRestaurant: (state, action: PayloadAction<RestaurantType>) => {
      return {
        ...state,
        restaurants: state.restaurants.map((item) => (item._id === action.payload._id ? action.payload : item)),
      };
    },
    deleteRestaurant: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        restaurants: state.restaurants.filter((item) => item._id !== action.payload),
      };
    },
    sortRestaurants: (
      state,
      action: PayloadAction<"Alfabetycznie (A-Z)" | "Alfabetycznie (Z-A)" | "Ocena: malejąco" | "Ocena: rosnąco">
    ) => {
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

export const { setRestaurants, sortRestaurants, updateRestaurants, updateRestaurant, deleteRestaurant } =
  restaurantSlice.actions;

export default restaurantSlice.reducer;
