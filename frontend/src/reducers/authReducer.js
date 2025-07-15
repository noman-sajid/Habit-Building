import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUser,
  registerUser,
  loadUser,
  forgotPassword,
  resetPassword,
} from '../actions/authActions';

// Thunks
export const login = createAsyncThunk('auth/login', loginUser);
export const register = createAsyncThunk('auth/register', registerUser);
export const load = createAsyncThunk('auth/loadUser', loadUser);
export const forgot = createAsyncThunk('auth/forgotPassword', forgotPassword);
export const reset = createAsyncThunk('auth/resetPassword', resetPassword);

// Initial State
const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  initialized: false,
  message: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.message = null;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initialized = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.initialized = true;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initialized = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.initialized = true;
      })

      // Load
      .addCase(load.pending, (state) => {
        state.loading = true;
      })
      .addCase(load.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initialized = true;
      })
      .addCase(load.rejected, (state, action) => {
        state.loading = false;
        if (action.error.message === 'NotLoggedIn') {
          state.user = null;
          state.isAuthenticated = false;
          state.error = null;
        } else {
          state.error = action.error.message;
        }
        state.initialized = true;
      })

      // Forgot Password
      .addCase(forgot.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgot.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(forgot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Reset Password
      .addCase(reset.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(reset.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(reset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearErrors, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
