import api from '../services/axiosInstance';

// Register
// export const registerUser = async (userData) => {
//   const response = await api.post('/users/register', userData, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });

//   return response.data.user;
// };

export const registerUser = async (userData) => {
  console.log("📤 Sending registerUser data:", userData); // log before sending

  const response = await api.post('/users/register', userData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  console.log("📥 Received response from backend:", response.data); // log after receiving
  return response.data.user;
};



// login with Google
export const loginWithGoogle = async (googleData) => {
  const response = await api.post('/users/google-login', googleData); // no need for multipart
  return response.data.user;
};



// Login
export const loginUser = async ({ email, password }) => {
  const response = await api.post('/users/login', { email, password });
  return response.data.user;
};


//Logout
export const logoutUser = async () => {
  const response = await api.get('/users/logout');
  return response.data;
};

// Load profile (to restore session)


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

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await api.post('/users/forgot-password', { email });
  return { message: response.data.message || response.data };
};


export const resetPassword = async ({ token, passwords }) => {
  try {
    const response = await api.put(`/users/reset/${token}`, passwords);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Reset failed';
    console.error('[resetPassword ACTION] Error:', message);
    throw new Error(message); // ensures reducer gets action.error.message
  }
};

// Update Profile
export const updateProfile = async (userData) => {
  const response = await api.patch('/users/update-profile', userData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data.user;
};

// Update Password
export const updatePassword = async (passwords) => {
  const response = await api.patch('/users/update-password', passwords);
  return response.data;
};

// Request Email Change
export const requestEmailChange = async (email) => {
  const response = await api.patch('/users/request-email-change', { email });
  return response.data;
};

// Confirm Email Change
export const confirmEmailChange = async (token) => {
  const response = await api.patch(`/users/confirm-email/${token}`);
  return response.data;
};

