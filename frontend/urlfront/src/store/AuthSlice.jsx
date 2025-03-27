import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage on app start
const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: storedUser,
  isAuthenticated: !!storedUser, // Set true if user exists
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save user in localStorage
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); // Clear localStorage on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

