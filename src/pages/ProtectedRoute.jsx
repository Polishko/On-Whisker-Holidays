import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
