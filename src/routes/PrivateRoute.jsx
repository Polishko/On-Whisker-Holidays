import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../components/contexts/AuthContext";

function PrivateRoute() {
  const { isAuthenticated, checkTokenValidity } = useAuth();

  useEffect(() => {
    checkTokenValidity();
  }, [checkTokenValidity]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
