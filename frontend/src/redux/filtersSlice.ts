import { createSlice } from "@reduxjs/toolkit";
import { CATEGORY_ARRAY, RATING_ARRAY } from "../../constatns";

type FilterQueryType = {
  $gte?: number;
  $lte?: number;
  category?: string;
};

type SliceState = {
  filterQuery: Array<FilterQueryType>;
  isActive: boolean;
};

const initialState: SliceState = {
  filterQuery: [],
  isActive: false,
};

const filtersSlice = createSlice({
  name: "filtersSlice",
  initialState,
  reducers: {
    updateFilterQuery: (state, action) => {
      const condition = state.filterQuery.some(
        (item: any) => item.$gte === action.payload || item.category === action.payload
      );

      if (RATING_ARRAY.includes(action.payload) && !condition) {
        //NOTE: handling custom value of rating
        if (action.payload === "challange ostrości") {
          return {
            ...state,
            filterQuery: [...state.filterQuery, { $gte: action.payload, $lte: action.payload }],
          };
        } else {
          return {
            ...state,
            filterQuery: [...state.filterQuery, { $gte: action.payload, $lte: action.payload + 0.9 }],
          };
        }
      }

      if (CATEGORY_ARRAY.includes(action.payload) && !condition) {
        return {
          ...state,
          filterQuery: [...state.filterQuery, { category: action.payload }],
        };
      }

      if (typeof action.payload === "number" && condition) {
        return {
          ...state,
          filterQuery: state.filterQuery.filter((item: any) => item.$gte !== action.payload),
        };
      }

      if (typeof action.payload === "string" && condition) {
        return {
          ...state,
          filterQuery: state.filterQuery.filter((item: any) => item.category !== action.payload),
        };
      }
    },
    clearFilterQuery: (state) => {
      state.filterQuery = [];
      state.isActive = false;
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
  },
});

export const { updateFilterQuery, clearFilterQuery, setIsActive } = filtersSlice.actions;

export default filtersSlice.reducer;
