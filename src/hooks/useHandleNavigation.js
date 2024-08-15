import { useEffect } from "react";
import { useLocation, useNavigationType, useNavigate } from "react-router-dom";

export function useHandleNavigation(
  clearSearchQuery,
  setSearchParams,
  currentSearchQuery,
  isUserTyping,
  isQueryCleared
) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();

  useEffect(() => {
    // sync URL with the global search query
    if (!currentSearchQuery) {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ query: currentSearchQuery }, { replace: true });
    }

    if (isQueryCleared) {
      setSearchParams({}, { replace: true });
    }

    // custom navigation logic: If user navigates to /hotels clear search query
    if (!isUserTyping && !isQueryCleared && navigationType === "POP") {
      if (!location.pathname.includes("/hotels/")) {
        clearSearchQuery();
        setSearchParams({}, { replace: true });
      } else {
        // If user navigates back when on hotel items clear search query if there is one
        if (currentSearchQuery) {
          clearSearchQuery();
          setSearchParams({}, { replace: true });
          navigate("/hotels");
        }
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
