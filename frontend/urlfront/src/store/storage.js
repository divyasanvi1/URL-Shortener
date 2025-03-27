import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";

const storage = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default storage;
