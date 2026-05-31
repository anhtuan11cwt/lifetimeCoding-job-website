import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  initialState: {
    allJobs: [],
    searchedQuery: "",
    singleJob: null,
  },
  name: "job",
  reducers: {
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

export const { setAllJobs, setSearchedQuery, setSingleJob } = jobSlice.actions;
export default jobSlice.reducer;
