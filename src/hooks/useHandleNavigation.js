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
    if (navigationType === "POP") {
      if (!location.pathname.includes("/hotels/")) {
        clearSearchQuery();
        setSearchParams({}, { replace: true });
      } else {
        if (currentSearchQuery) {
          clearSearchQuery();
          setSearchParams({}, { replace: true });
          navigate("/hotels");
        } else if (localStorage.getItem("prevURL") === location.pathname)
          navigate("/hotels");
      }
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
