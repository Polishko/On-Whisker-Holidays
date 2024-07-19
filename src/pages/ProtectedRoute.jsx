import { Navigate } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children || null;
}

export default ProtectedRoute;
