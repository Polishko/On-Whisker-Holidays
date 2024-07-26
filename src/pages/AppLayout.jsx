import styles from "./AppLayout.module.css";
import HotelList from "../components/hotel/HotelList";
// import Map from "../components/map/Map";
import PageNav from "../components/common/PageNav";
import SearchBar from "../components/common/SearchBar";
import Details from "../components/details/Details";
import User from "../components/user/User";
import { useAuth } from "../components/contexts/AuthContext";
import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

function AppLayout() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && location.pathname === "/profile") {
        navigate("/login");
      }
    },
    [isAuthenticated, navigate, location.pathname]
  );

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
