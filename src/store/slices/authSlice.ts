/**
 * Redux slice for managing authentication state
 * Handles user data, authentication status, loading states, and errors
 */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {AuthState, StrapiUser, StrapiError} from '@/types/auth.types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Updates state with authenticated user data
    setUser: (state, action: PayloadAction<StrapiUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    // Updates state with authentication status
    setAuthenticated: state => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    // Clears all authentication state
    clearAuth: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    // Sets error message in state
    setError: (state, action: PayloadAction<StrapiError>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setUser, setAuthenticated, clearAuth, setError, setLoading} =
  authSlice.actions;
export default authSlice.reducer;
