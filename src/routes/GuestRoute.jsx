import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";
import { useEffect } from "react";

function GuestRoute() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  }, [isAuthenticated, navigate]);

  return !isAuthenticated ? <Outlet /> : null;
}

export default GuestRoute;
