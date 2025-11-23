import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/login/AuthService';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const isAuthenticated = AuthService.isAutenticado();
  const usuario = AuthService.getUsuarioActual();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && usuario?.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
