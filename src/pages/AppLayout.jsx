import styles from "./AppLayout.module.css";
import HotelList from "../components/hotel/HotelList";
import Map from "../components/map/Map";
import PageNav from "../components/common/PageNav";
import SearchBar from "../components/common/SearchBar";
import Details from "../components/details/Details";
import User from "../components/user/User";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/common/Modal";
import Profile from "./Profile";
import { useAuth } from "../components/contexts/AuthContext";
import { useEffect, useState } from "react";

function AppLayout() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === "/profile" && !isAuthenticated) {
      navigate("/login");
    } else if (
      location.pathname === "/profile" &&
      isAuthenticated &&
      !isModalOpen
    )
      navigate("/hotels");
  }, [location.pathname, isAuthenticated, navigate, isModalOpen]);

  function closeModal() {
    navigate("/hotels");
    setIsModalOpen(false);
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
      {user && <User setIsModalOpen={setIsModalOpen} />}
      {isProfileModal && (
        <Modal onClose={closeModal} customClass="customModalButton">
          <Profile onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default AppLayout;
