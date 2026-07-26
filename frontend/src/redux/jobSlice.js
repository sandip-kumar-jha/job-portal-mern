import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // User Side
  allJobs: [],
  singleJob: null,
  allAppliedJobs: [],

  // Admin Side
  allAdminJobs: [],

  // Search & Filter
  searchJobByText: "",
  searchedQuery: "",

  // Loading & Error
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "job",
  initialState,

  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },

    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },

    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },

    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },

    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },

    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearJobState: (state) => {
      state.singleJob = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  setLoading,
  setError,
  clearJobState,
} = jobSlice.actions;

export default jobSlice.reducer;