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
    updateApplicationStatus: (state, action) => {
      const { id, status } = action.payload;
      if (state.applicants?.applications) {
        const index = state.applicants.applications.findIndex(
          (app) => app._id === id,
        );
        if (index !== -1) {
          state.applicants.applications[index].status = status;
        }
      }
    },
  },
});

export const { setAllApplicants, updateApplicationStatus } =
  applicationSlice.actions;
export default applicationSlice.reducer;
