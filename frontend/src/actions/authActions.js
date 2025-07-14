import api from '../services/axiosInstance';

// Register
export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data.user;
};


// Login
export const loginUser = async ({ email, password }) => {
  const response = await api.post('/users/login', { email, password });
  return response.data.user;
};

// Load profile (to restore session)

// authActions.js
export const loadUser = async () => {
  try {
    console.log('[loadUser] Sending GET request to /profile...');
    const response = await api.get('/users/profile');
    console.log('[loadUser] Response:', response.data);
    return response.data.user;
  } catch (err) {
    if (err.response?.status === 401) {
      console.log('[loadUser] Not logged in (401), skipping.');
      // Throwing a non-error (to skip error propagation in redux)
      throw new Error('NotLoggedIn');
    }
    throw err;
  }
};

