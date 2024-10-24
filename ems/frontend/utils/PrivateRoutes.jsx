import React from "react";
import { useAuth } from "../src/context/AuthContext"; // Adjust import path
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show loading while user state is being verified
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
