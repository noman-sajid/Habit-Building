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
  const response = await api.post('/login', { email, password });
  return response.data.user;
};

// Load profile (to restore session)
export const loadUser = async () => {
   console.log('[loadUser] Sending GET request to /profile...');
  const response = await api.get('/users/profile');
    console.log('[loadUser] Response:', response.data);
  return response.data.user;
};
