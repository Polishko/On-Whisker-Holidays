import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./AppLayout.module.css";

import { useAuth } from "../components/contexts/AuthContext";
import { useCheckAuth } from "../hooks/useCheckTokenValidity";

import HotelList from "../components/hotel/HotelList";
import PageNav from "../components/common/PageNav";
import SearchBar from "../components/common/SearchBar";
import Details from "../components/details/Details";
import User from "../components/user/User";
import Button from "../components/common/Button";

function AppLayout() {
  const { user, isAuthenticated } = useAuth();
  const checkAuth = useCheckAuth();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/profile") {
      if (!checkAuth()) return;
    }
  }, [checkAuth, location.pathname]);

  return (
    <div className={styles.appLayout}>
      <PageNav />
      <div className={styles.app}>
        <NavLink to="/map">
          <Button className={`${styles.mapButton}`}>Search on Map</Button>
        </NavLink>
        <div className={styles.container}>
          <div className={styles.left}>
            <SearchBar />
            <HotelList />
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
