import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../slices/shopSlice";
export const store = configureStore({
  reducer: {
    // Shop List Reducer
    shopReducer: shopReducer,
  },
});
