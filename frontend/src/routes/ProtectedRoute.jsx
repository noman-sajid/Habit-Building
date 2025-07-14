// src/routes/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, initialized } = useSelector((state) => state.auth);

  console.log('[ProtectedRoute] loading:', loading, 'isAuthenticated:', isAuthenticated, 'initialized:', initialized);

  if (!initialized || loading) {
    return <div className="text-center p-10">Initializing session...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
