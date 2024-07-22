import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";
import { useState } from "react";
import Modal from "../modal/Modal";
import Profile from "../../pages/Profile";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  function openProfile(e) {
    e.preventDefault();
    navigate("profile", { state: { modal: true } });
    setIsModalOpen(true);
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt="User Avatar" />
      <p>{user.name}</p>
      <button onClick={logout}>Logout</button>
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
