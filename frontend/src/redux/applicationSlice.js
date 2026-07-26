import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Recruiter Side
  applicants: [],

  // Student Side
  appliedJobs: [],

  // UI State
  loading: false,
  error: null,
};

const applicationSlice = createSlice({
  name: "application",
  initialState,

  reducers: {
    // Applicants for a Job
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },

    // Applied Jobs of User
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },

    // Loading
    setApplicationLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Error
    setApplicationError: (state, action) => {
      state.error = action.payload;
    },

    // Clear State
    clearApplicationState: (state) => {
      state.applicants = [];
      state.appliedJobs = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setAllApplicants,
  setAppliedJobs,
  setApplicationLoading,
  setApplicationError,
  clearApplicationState,
} = applicationSlice.actions;

export default applicationSlice.reducer;