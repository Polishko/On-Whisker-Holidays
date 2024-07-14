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
      {user && (
        <li>
          <User setIsModalOpen={setIsModalOpen} />
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
