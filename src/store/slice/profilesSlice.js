import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    employeeSelect: {},
  },
  reducers: {
    setEmployeeSelect(state, action) {
      state.employeeSelect = { ...(action.payload || {}) };
    },
  },
});

export const { setEmployeeSelect } = profileSlice.actions;
export default profileSlice.reducer;
