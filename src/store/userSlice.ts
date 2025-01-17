// src/store/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false, // Tracks whether the user is logged in
  user: null,     // Stores user data (e.g., name, email, etc.)
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = action.payload; // Update isLogin state
    },
    setUser: (state, action) => {
      state.user = action.payload; // Update user state
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = null; // Reset user state on logout
    },
  },
});

export const { setLogin, setUser, logout } = userSlice.actions;
export default userSlice.reducer;
