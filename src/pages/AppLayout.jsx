import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

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
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isQueryCleared, setIsQueryCleared] = useState(false);

  const { currentSearchQuery, clearSearchQuery, setSearchQuery } =
    useSearchQuery();
  const [position, setPosition] = useState("");

  const { user, isAuthenticated } = useAuth();
  const { hotels, isLoading } = useHotels();
  const [mapLat, mapLng] = useUrlPosition();

  const filteredHotels = useFilter(hotels, currentSearchQuery);

  useHandleNavigation(
    clearSearchQuery,
    setSearchParams,
    currentSearchQuery,
    isUserTyping,
    isQueryCleared
  );

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
            <SearchBar
              filteredHotels={filteredHotels}
              setIsUserTyping={setIsUserTyping}
              setIsQueryCleared={setIsQueryCleared}
            />

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
