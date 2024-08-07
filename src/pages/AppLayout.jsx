import { useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

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
import Spinner from "../components/common/Spinner";

function AppLayout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentQuery, setCurrentQuery] = useState(""); //This will be better handled in a context since it's global
  const [position, setPosition] = useState("");

  const { user, isAuthenticated } = useAuth();
  const { hotels, isLoading } = useHotels();
  const [mapLat, mapLng] = useUrlPosition();

  const query = searchParams.get("query");
  const filteredHotels = useFilter(hotels, currentQuery);

  useEffect(() => {
    // Clear localStorage scroll position when navigating to /hotels (but not /hotels/:id)
    if (location.pathname === "/hotels") {
      localStorage.removeItem("lastClickedPosition");
    }
  }, []);

  useEffect(() => {
    if (query) {
      setCurrentQuery(query);
    } else if (!currentQuery && !location.pathname.includes("/hotels/")) {
      //attempting proper back navigation to hotel item
      navigate("/hotels");
    } else {
      setCurrentQuery("");
    }
  }, [query, currentQuery, navigate, location.pathname]);

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
              setCurrentQuery={setCurrentQuery}
            />

            {isLoading ? (
              <Spinner />
            ) : (
              <HotelList
                filteredHotels={filteredHotels}
                currentQuery={currentQuery}
              />
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
