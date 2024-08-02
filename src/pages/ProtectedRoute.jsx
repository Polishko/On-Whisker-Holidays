import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";
import { useEffect } from "react";

function ProtectedRoute() {
  const { isAuthenticated, checkTokenValidity } = useAuth();

  useEffect(() => {
    checkTokenValidity();
  }, [checkTokenValidity]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
