// src/pages/dashboard/DashboardPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 p-8 text-stone-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
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
