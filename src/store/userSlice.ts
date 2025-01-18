import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL (Adjust according to your backend configuration)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Replace with your actual backend URL

// Define the types for user and error
interface User {
  id: string;
  name: string;
  email: string;
  // Add other fields according to your user model
}

interface UserState {
  isLogin: boolean;
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  isLogin: false,
  user: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

// Async Thunk to fetch user data from Spring Boot backend
export const fetchUserFromBackend = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>("user/fetchUserFromBackend", async (clerkUserId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${clerkUserId}`);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch user data";
    return rejectWithValue(errorMessage);
  }
});

// Async Thunk to add user to the backend
export const addUserToBackend = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>("user/addUserToBackend", async (newUser, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, newUser, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to add user to the backend";
    return rejectWithValue(errorMessage);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    resetUser(state) {
      state.isLogin = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchUserFromBackend
    builder
      .addCase(fetchUserFromBackend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserFromBackend.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLogin = true;
      })
      .addCase(fetchUserFromBackend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      });

    // Handle addUserToBackend
    builder
      .addCase(addUserToBackend.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUserToBackend.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(addUserToBackend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || null;
      });
  },
});

export const { setLogin, setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
