import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  initialState: {
    companies: [],
    searchCompanyByText: "",
    singleCompany: null,
  },
  name: "company",
  reducers: {
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
  },
});

export const { setCompanies, setSearchCompanyByText, setSingleCompany } =
  companySlice.actions;
export default companySlice.reducer;
