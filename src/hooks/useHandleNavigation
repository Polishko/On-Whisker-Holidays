import { useEffect } from "react";
import { useLocation, useNavigationType, useNavigate } from "react-router-dom";

export function useHandleNavigation(
  clearSearchQuery,
  setSearchParams,
  currentSearchQuery
) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();

  useEffect(() => {
    if (navigationType === "POP" && !location.pathname.includes("/hotels/")) {
      clearSearchQuery();
      setSearchParams({}, { replace: true });
    } else if (
      navigationType === "POP" &&
      location.pathname.includes("/hotels/") &&
      currentSearchQuery
    ) {
      clearSearchQuery();
      setSearchParams({}, { replace: true });
      navigate("/hotels");
    } else if (
      navigationType === "POP" &&
      location.pathname.includes("/hotels/") &&
      localStorage.getItem("prevURL") === location.pathname
    ) {
      navigate("/hotels");
    }
  }, [
    location.pathname,
    navigationType,
    clearSearchQuery,
    setSearchParams,
    navigate,
    currentSearchQuery,
  ]);
}
