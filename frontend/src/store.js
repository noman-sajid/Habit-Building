import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import habitReducer from './reducers/habitReducer';
import offlineReducer from './reducers/offlineReducer'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    habits: habitReducer,
    offline: offlineReducer, 
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
