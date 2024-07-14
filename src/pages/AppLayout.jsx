import styles from "./AppLayout.module.css";
import HotelList from "../components/hotel/HotelList";
import Map from "../components/map/Map";
import PageNav from "../components/PageNav";
import SearchBar from "../components/SearchBar";
import Details from "../components/details/Details";
import User from "../components/user/User";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Common/Modal";
import Profile from "./Profile";
import { useAuth } from "../components/contexts/AuthContext";
import { useEffect } from "react";

function AppLayout() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(`isAuth: ${isAuthenticated}`);
  // console.log(user.name);

  useEffect(() => {
    if (location.pathname === "/hotels/profile" && !isAuthenticated) {
      navigate("/login");
    }
  }, [location.pathname, isAuthenticated, navigate]);

  function closeModal() {
    navigate("/hotels");
    console.log(`isAuth: ${isAuthenticated}`);
  }

  const isProfileModal = location.state && location.state.modal;

  return (
    <div className={styles.appLayout}>
      <PageNav />
      <div className={styles.app}>
        <div className={styles.container}>
          <div className={styles.left}>
            <SearchBar />
            <HotelList />
          </div>
          <div className={styles.right}>
            <Details />
            <Map />
          </div>
        </div>
      </div>
      {user && (
        <li>
          <User />
        </li>
      )}
      {isProfileModal && (
        <Modal onClose={closeModal}>
          <Profile />
        </Modal>
      )}
    </div>
  );
}

export default AppLayout;
