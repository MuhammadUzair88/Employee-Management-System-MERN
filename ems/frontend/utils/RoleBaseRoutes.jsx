import React from "react";
import { useAuth } from "../src/context/AuthContext";
import { Navigate } from "react-router-dom";

const RoleBaseRoutes = ({ requiredRole, children }) => {
  const { user } = useAuth();

  // Check if the user has the required role
  return user && requiredRole.includes(user.role) ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default RoleBaseRoutes;
