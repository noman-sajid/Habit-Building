import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import habitReducer from './reducers/habitReducer';
import offlineReducer from './reducers/offlineReducer'; // ✅ Import new reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    habits: habitReducer,
    offline: offlineReducer, // ✅ Add offline state
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
