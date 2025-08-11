import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUser,
  registerUser,
  loadUser,
  forgotPassword,
  resetPassword,
  loginWithGoogle,
  logoutUser,
  updateProfile,
  updatePassword,
  requestEmailChange,
  confirmEmailChange,
} from '../actions/authActions';

// Thunks
export const login = createAsyncThunk('auth/login', loginUser);
export const register = createAsyncThunk('auth/register', registerUser);
export const logout = createAsyncThunk('auth/logout', logoutUser);
export const loginGoogle = createAsyncThunk('auth/loginGoogle', loginWithGoogle);
export const load = createAsyncThunk('auth/loadUser', loadUser);
export const forgot = createAsyncThunk(
  'auth/forgotPassword',
  async (email, thunkAPI) => {
    try {
      return await forgotPassword(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Something went wrong'
      );
    }
  }
);
export const reset = createAsyncThunk('auth/resetPassword', resetPassword);
export const updateUserProfile = createAsyncThunk('auth/updateProfile', updateProfile);
export const updateUserPassword = createAsyncThunk('auth/updatePassword', updatePassword);
export const requestEmailUpdate = createAsyncThunk('auth/requestEmailChange', requestEmailChange);
export const confirmEmailUpdate = createAsyncThunk('auth/confirmEmailChange', confirmEmailChange);

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

      // Google Login
      .addCase(loginGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.initialized = true;
      })
      .addCase(loginGoogle.rejected, (state, action) => {
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





      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.initialized = true;
      })
      .addCase(logout.rejected, (state, action) => {
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
        console.log('[REDUCER] Password reset success:', action.payload);
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(reset.rejected, (state, action) => {
        console.error('[REDUCER] Password reset failed:', action.error.message);
        state.loading = false;
        state.error = action.error.message;
      })

      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update Password
      .addCase(updateUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Request Email Change
      .addCase(requestEmailUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestEmailUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(requestEmailUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Confirm Email Change
      .addCase(confirmEmailUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmEmailUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(confirmEmailUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearErrors, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
