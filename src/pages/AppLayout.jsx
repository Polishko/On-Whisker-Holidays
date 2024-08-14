import { useEffect, useRef, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  useNavigationType,
  useSearchParams,
} from "react-router-dom";

import styles from "./AppLayout.module.css";

import { useAuth } from "../components/contexts/AuthContext";
import { useHotels } from "../components/contexts/HotelsContext";
import { useSearchQuery } from "../components/contexts/SearchQueryContext";
import { useFilter } from "../hooks/useFilter";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useHandleNavigation } from "../hooks/useHandleNavigation";

import HotelList from "../components/hotel/HotelList";
import PageNav from "../components/common/PageNav";
import SearchBar from "../components/common/SearchBar";
import Details from "../components/details/Details";
import User from "../components/user/User";
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";

function AppLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();

  const { currentSearchQuery, clearSearchQuery } = useSearchQuery();
  const [position, setPosition] = useState("");

  const { user, isAuthenticated } = useAuth();
  const { hotels, isLoading } = useHotels();
  const [mapLat, mapLng] = useUrlPosition();

  const filteredHotels = useFilter(hotels, currentSearchQuery);

  useEffect(() => {
    const urlQuery = searchParams.get("query");
    localStorage.setItem("prevURL", location.path);

    if (!currentSearchQuery) {
      setSearchParams({}, { replace: true });
      localStorage.setItem("prevSearchQuery", "");
    }

    if (currentSearchQuery && currentSearchQuery !== urlQuery) {
      setSearchParams({ query: currentSearchQuery }, { replace: true });
      localStorage.setItem("prevSearchQuery", currentSearchQuery);
    }
  }, [currentSearchQuery, setSearchParams, searchParams]);

  useHandleNavigation(clearSearchQuery, setSearchParams, currentSearchQuery);

  useEffect(() => {
    if (mapLat && mapLng) setPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  return (
    <div className={styles.appLayout}>
      <PageNav />

      <div className={styles.app}>
        <NavLink
          to={{
            pathname: "/map",
          }}
          state={{ position }} //passing data to route
        >
          <Button type={"secondary"} className={`${styles.mapButton}`}>
            Search on Map
          </Button>
        </NavLink>

        <div className={styles.container}>
          <div className={styles.left}>
            <SearchBar filteredHotels={filteredHotels} />

            {isLoading ? (
              <Spinner />
            ) : (
              <HotelList filteredHotels={filteredHotels} />
            )}
          </div>

          <div className={styles.right}>
            <Details />
          </div>
        </div>
      </div>
      {user && isAuthenticated && <User />}
    </div>
  );
}

export default AppLayout;
