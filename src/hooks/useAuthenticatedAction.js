import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";

export function useAuthenticatedAction() {
  const { isAuthenticated, checkTokenValidity } = useAuth();
  const navigate = useNavigate();

  const execute = (action) => {
    checkTokenValidity();
    if (!isAuthenticated) {
      navigate("/login");
      return false; // Return false to indicate that the action was not executed
    }

    action(); // Action executed if authenticated
    return true;
  };

  return execute;
}
