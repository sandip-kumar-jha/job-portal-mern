import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Company Data
  companies: [],
  singleCompany: null,

  // Search
  searchCompanyByText: "",

  // UI State
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,

  reducers: {
    // All Companies
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },

    // Selected Company
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },

    // Search Company
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },

    // Loading
    setCompanyLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Error
    setCompanyError: (state, action) => {
      state.error = action.payload;
    },

    // Clear Company
    clearCompanyState: (state) => {
      state.singleCompany = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setCompanies,
  setSingleCompany,
  setSearchCompanyByText,
  setCompanyLoading,
  setCompanyError,
  clearCompanyState,
} = companySlice.actions;

export default companySlice.reducer;