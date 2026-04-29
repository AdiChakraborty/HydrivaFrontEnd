import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Lottie from "lottie-react";
import noDataAni from "../assets/noDataAni.json";
import Video from "../assets/loding.webm";
export const RequireGuest = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <video muted autoPlay loop>
          <source src={Video} type="video/webm" />
        </video>
      </div>
    );

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
