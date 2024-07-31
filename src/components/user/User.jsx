import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";
import { useState } from "react";
import Modal from "../modal/Modal";
import Profile from "../../pages/Profile";
import Button from "../common/Button";
import { useCheckAuth } from "../../hooks/useCheckTokenValidity";

function User() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const checkAuth = useCheckAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  function openProfile(e) {
    e.preventDefault();
    if (!checkAuth()) return;
    navigate("profile", { state: { modal: true } });
    setIsModalOpen(true);
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt="User Avatar" />
      <p>{user.name}</p>
      <Button className={styles.logoutButton} onClick={logout}>
        Logout
      </Button>
      <NavLink
        to="/profile"
        onClick={openProfile}
        className={styles.profileButton}
      >
        Edit Profile
      </NavLink>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <Profile onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default User;
