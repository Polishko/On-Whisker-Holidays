import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../components/contexts/AuthContext";

function PrivateRoute() {
  const { isAuthenticated, checkTokenValidity } = useAuth();
  const location = useLocation();

  useEffect(() => {
    checkTokenValidity();
  }, [checkTokenValidity]);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}

export default PrivateRoute;
