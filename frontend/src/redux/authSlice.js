import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: localStorage.getItem('authInfo')
      ? JSON.parse(localStorage.getItem('authInfo'))
      : null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('authInfo', JSON.stringify(action.payload));
    },
    removeAuth: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('authInfo');
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
