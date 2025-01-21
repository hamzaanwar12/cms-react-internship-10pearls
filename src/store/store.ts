// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    userState: userReducer, // Add the user slice to the store
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;