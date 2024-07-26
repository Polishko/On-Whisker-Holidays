import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";
import { useState } from "react";
import Modal from "../modal/Modal";
import Profile from "../../pages/Profile";
import Button from "../common/Button";

function User() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  function openProfile(e) {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate("profile", { state: { modal: true } });
    setIsModalOpen(true);
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt="User Avatar" />
      <p>{user.name}</p>
      <Button onClick={logout}>Logout</Button>
      <NavLink
        to="/profile"
        onClick={openProfile}
        className={`${styles.ctaLink} ${styles.profile}`}
      >
        Edit Profile
      </NavLink>
      {isModalOpen && (
        <Modal onClose={closeModal} customClass="customModalButton">
          <Profile onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default User;
