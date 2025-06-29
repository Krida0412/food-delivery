// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.uid) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
