import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./User.module.css";

import { useAuth } from "../contexts/AuthContext";

import Modal from "../modal/Modal";
import Profile from "../../pages/Profile";
import Button from "../common/Button";

function User() {
  const navigate = useNavigate();

  const { user, logout, isAuthenticated } = useAuth();
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
