import { configureStore } from '@reduxjs/toolkit';
import authReducer  from './reducers/authReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // other reducers will be added here (e.g., habits)
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
