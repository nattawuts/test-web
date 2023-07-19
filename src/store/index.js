import { configureStore } from "@reduxjs/toolkit";
import profilesSlice from "./slice/profilesSlice";

export const store = configureStore({
  reducer: {
    profile: profilesSlice,
  },
});
