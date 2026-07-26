import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Authentication
  loading: false,
  user: null,
  isAuthenticated: false,

  // Role (student / recruiter)
  role: "",

  // User Profile
  profile: null,

  // Error Handling
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Login User
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.role = action.payload?.role || "";
      state.profile = action.payload?.profile || null;
    },

    // Update Profile
    updateProfile: (state, action) => {
      if (state.user) {
        state.user.profile = action.payload;
        state.profile = action.payload;
      }
    },

    // Error
    setAuthError: (state, action) => {
      state.error = action.payload;
    },

    // Logout
    logoutUser: (state) => {
      state.user = null;
      state.profile = null;
      state.role = "";
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setUser,
  updateProfile,
  setAuthError,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;