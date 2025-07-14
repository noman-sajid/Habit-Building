// reducers/authReducer.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, loadUser } from '../actions/authActions';

export const login = createAsyncThunk('auth/login', loginUser);
export const register = createAsyncThunk('auth/register', registerUser);
export const load = createAsyncThunk('auth/loadUser', loadUser);

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  initialized: false, // 🔁 new flag
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.initialized = true; // ensure state is fully reset
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(load.pending, (state) => {
        state.loading = true;
      })
      .addCase(load.fulfilled, (state, action) => {
        console.log('[authReducer] load.fulfilled - setting user:', action.payload);
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
    state.error = null; // Prevents UI alerts
  } else {
    state.error = action.error.message;
  }

  state.initialized = true;
});


  },
});

export const { clearErrors, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
