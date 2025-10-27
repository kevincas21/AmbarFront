// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, allowedRoles }) => {
  const role = localStorage.getItem('user_role');

  if (!role) {
    // Si no está logueado, redirige al login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Si no tiene permiso, muestra mensaje
    return <h1 className="text-center mt-5">🚫 Sin autorización</h1>;
  }

  return <Component />;
};

export default PrivateRoute;
