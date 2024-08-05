import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../components/contexts/AuthContext";

function GuestRoute() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // navigate(-1); causing issues with search query
      navigate("/hotels");
    }
  }, [isAuthenticated, navigate]);

  return !isAuthenticated ? <Outlet /> : null; // prevent flash/unintended content
}

export default GuestRoute;
