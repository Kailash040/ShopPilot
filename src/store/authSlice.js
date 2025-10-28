import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  signUpLoading: false,
  signUpError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Sign In actions
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
      localStorage.removeItem('token');
    },

    // Sign Up actions
    signUpStart: (state) => {
      state.signUpLoading = true;
      state.signUpError = null;
    },
    signUpSuccess: (state, action) => {
      state.signUpLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.signUpError = null;
      localStorage.setItem('token', action.payload.token);
    },
    signUpFailure: (state, action) => {
      state.signUpLoading = false;
      state.signUpError = action.payload;
    },

    // Sign Out action
    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.signUpLoading = false;
      state.signUpError = null;
      localStorage.removeItem('token');
    },

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
      state.signUpError = null;
    },
    checkAuthStatus: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      } else {
        state.token = null;
        state.isAuthenticated = false;
        state.user = null;
      }
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  signOut,
  clearErrors,
  checkAuthStatus,
} = authSlice.actions;

export default authSlice.reducer;
