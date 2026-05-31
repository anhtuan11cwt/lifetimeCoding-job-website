import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  initialState: {
    applicants: null,
  },
  name: "application",
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
