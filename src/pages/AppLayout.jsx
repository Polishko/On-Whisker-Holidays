import { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";

import styles from "./AppLayout.module.css";

import { useAuth } from "../components/contexts/AuthContext";
import { useHotels } from "../components/contexts/HotelsContext";
import { useFilter } from "../hooks/useFilter";
import { useUrlPosition } from "../hooks/useUrlPosition";

import HotelList from "../components/hotel/HotelList";
import PageNav from "../components/common/PageNav";
import SearchBar from "../components/common/SearchBar";
import Details from "../components/details/Details";
import User from "../components/user/User";
import Button from "../components/common/Button";

function AppLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [currentQuery, setCurrentQuery] = useState("");
  const [position, setPosition] = useState("");

  const { user, isAuthenticated } = useAuth();
  const { hotels } = useHotels();

  const [mapLat, mapLng] = useUrlPosition();

  const query = searchParams.get("query");
  const filteredHotels = useFilter(hotels, currentQuery);

  useEffect(() => {
    if (query) {
      setCurrentQuery(query);
    } else if (!currentQuery) {
      navigate("/hotels");
    } else {
      setCurrentQuery("");
    }
  }, [query]);

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
          state={{ position }} //pass data to route
        >
          <Button type={"secondary"} className={`${styles.mapButton}`}>
            Search on Map
          </Button>
        </NavLink>

        <div className={styles.container}>
          <div className={styles.left}>
            <SearchBar
              filteredHotels={filteredHotels}
              setCurrentQuery={setCurrentQuery}
            />

            <HotelList
              filteredHotels={filteredHotels}
              currentQuery={currentQuery}
            />
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
