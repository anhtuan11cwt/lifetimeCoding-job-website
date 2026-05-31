import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  initialState: {
    allAdminJobs: [],
    allJobs: [],
    searchedQuery: "",
    singleJob: null,
  },
  name: "job",
  reducers: {
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
  },
});

export const { setAllAdminJobs, setAllJobs, setSearchedQuery, setSingleJob } =
  jobSlice.actions;
export default jobSlice.reducer;
