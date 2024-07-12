import { Navigate } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";

function ProtectedRoute({ element, ...rest }) {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;
