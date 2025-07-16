import { configureStore } from '@reduxjs/toolkit';
import authReducer  from './reducers/authReducer';
import habitReducer from './reducers/habitReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    habits: habitReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
