import { NavLink, useNavigate } from "react-router-dom";

import styles from "./User.module.css";

import { useAuth } from "../contexts/AuthContext";

import Button from "../common/Button";

function User() {
  const navigate = useNavigate();

  const { user, logout, isAuthenticated, checkTokenValidity } = useAuth();

  function openProfile(e) {
    e.preventDefault();
    checkTokenValidity();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate("profile");
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
    </div>
  );
}

export default User;
