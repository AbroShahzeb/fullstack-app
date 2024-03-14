import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice.js";
import { apiSlice } from "./apiSlice.js";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
