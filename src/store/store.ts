// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';

const store = configureStore({
  reducer: {
    user: userReducer, // Add the user slice to the store
  },
});

export default store;
