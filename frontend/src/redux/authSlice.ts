import { createSlice } from "@reduxjs/toolkit";

type UserInfoType = {
  userInfo: {
    _id: string;
    email: string;
    username: string;
  } | null;
};

const initialState: UserInfoType = {
  userInfo: localStorage.getItem("authInfo") ? JSON.parse(localStorage.getItem("authInfo") || "") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("authInfo", JSON.stringify(action.payload));
    },
    removeAuth: (state) => {
      state.userInfo = null;
      localStorage.removeItem("authInfo");
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
