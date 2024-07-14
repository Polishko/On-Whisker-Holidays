// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../components/contexts/AuthContext";

// function ProtectedRoute({ children }) {
//   const { user } = useAuth();
//   const location = useLocation();

//   return user ? children : <Navigate to="/login" state={{ from: location }} />;
// }

// export default ProtectedRoute;

// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../components/contexts/AuthContext";
// import { useEffect } from "react";

// function ProtectedRoute({ children }) {
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   useEffect(
//     function () {
//       if (!isAuthenticated) navigate("/login");
//     },
//     [isAuthenticated, navigate]
//   );

//   return isAuthenticated ? children : null;
// }

// export default ProtectedRoute;

import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children || <Outlet /> : null;
}

export default ProtectedRoute;
