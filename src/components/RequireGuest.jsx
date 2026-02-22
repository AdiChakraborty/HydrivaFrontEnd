import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export const RequireGuest = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
