import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const RequireAuth = ({ children }) => {
  const { isAuthenticated, loading } = useAuth() || {};

  if (loading) return null; // or loader

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};