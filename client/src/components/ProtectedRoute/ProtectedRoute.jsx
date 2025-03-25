import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
