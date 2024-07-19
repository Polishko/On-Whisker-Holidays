import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to the login page or home page if the user is not authenticated
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
