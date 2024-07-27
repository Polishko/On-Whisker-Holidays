import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";
import { useCallback } from "react";

export const useCheckAuth = () => {
  const { checkTokenValidity, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const checkAuth = useCallback(() => {
    checkTokenValidity();
    if (!isAuthenticated) {
      navigate("/login");
      return false;
    }
    return true;
  }, [checkTokenValidity, isAuthenticated, navigate]);

  return checkAuth;
};
