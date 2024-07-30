import { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

import styles from "./AppLayout.module.css";

import { useAuth } from "../components/contexts/AuthContext";
import { useCheckAuth } from "../hooks/useCheckTokenValidity";

import HotelList from "../components/hotel/HotelList";
import PageNav from "../components/common/PageNav";
import SearchBar from "../components/common/SearchBar";
import Details from "../components/details/Details";
import User from "../components/user/User";
import Button from "../components/common/Button";
import { useFilter } from "../hooks/useFilter";
import { useHotels } from "../components/contexts/HotelsContext";

function AppLayout() {
  const { user, isAuthenticated } = useAuth();
  const { hotels } = useHotels();
  const checkAuth = useCheckAuth();
  const location = useLocation();

  const { query } = useParams();

  const [currentQuery, setCurrentQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setCurrentQuery(query);
  }, [query]);

  const filteredHotels = useFilter(hotels, currentQuery);

  const checkProfileAuth = useCallback(() => {
    if (location.pathname === "/profile") {
      if (!checkAuth()) return;
    }
  }, [checkAuth, location.pathname]);

  useEffect(() => {
    checkProfileAuth();
  }, [checkProfileAuth]);

  return (
    <div className={styles.appLayout}>
      <PageNav />
      <div className={styles.app}>
        <NavLink to="/map">
          <Button type={"secondary"} className={`${styles.mapButton}`}>
            Search on Map
          </Button>
        </NavLink>
        <div className={styles.container}>
          <div className={styles.left}>
            <SearchBar
              filteredHotels={filteredHotels}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <HotelList
              filteredHotels={filteredHotels}
              setSearchQuery={setSearchQuery}
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
