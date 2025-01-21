import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types";

// Define the initial state and UserState interface
export interface UserState {
  isLogin: boolean;
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  isLogin: false,
  user: null,
  status: "idle",
  error: null,
};

// Main user slice with only reducers (no thunks)
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set login status
    setLogin(state, action) {
      state.isLogin = action.payload;
    },

    // Set user data
    setUser(state, action) {
      state.user = action.payload;
    },

    // Set error message
    setError(state, action) {
      state.error = action.payload;
    },

    // Set loading status
    setStatus(state, action) {
      state.status = action.payload;
    },

    // Reset user data
    resetUser(state) {
      state.isLogin = false;
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {setError,setLogin,setStatus,setUser} = userSlice.actions;
// causing problems
// export default userSlice;
export default userSlice.reducer;
