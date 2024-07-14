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

function AppLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const isProfileModal = location.state && location.state.modal;
  const navigate = useNavigate();

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
        <Modal onClose={() => navigate(-1)}>
          <Profile />
        </Modal>
      )}
    </div>
  );
}

export default AppLayout;
