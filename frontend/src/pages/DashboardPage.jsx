// src/pages/dashboard/DashboardPage.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { logoutSuccess } from '../reducers/authReducer';
import { forgotPassword } from '../actions/authActions';
import api from '../services/axiosInstance'; // Assuming you have an api.js file for API calls

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await api.get('/users/logout');
      dispatch(logoutSuccess());
      navigate('/');
    } catch (error) {
      console.error('[Logout Error]', error);
    }
  };

  const handleResetPassword = () => {
    if (user && user.email) {
      dispatch(forgotPassword(user.email));
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 p-8 text-stone-900 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="stoned" onClick={handleResetPassword}>
            Reset Password
          </Button>
          <Button variant="stoned" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {user ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.avatar && (
            <img
              src={user.avatar.url || user.avatar}
              alt={user.name}
              className="h-24 w-24 rounded-full object-cover mt-4"
            />
          )}
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default DashboardPage;
