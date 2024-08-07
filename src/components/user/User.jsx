import { NavLink, useNavigate, useLocation } from "react-router-dom";

import styles from "./User.module.css";

import { useAuth } from "../contexts/AuthContext";

import Button from "../common/Button";

function User() {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnHomePage = location.pathname === "/";
  const isOnAboutPage = location.pathname === "/about";
  const isOnMapPage = location.pathname === "/map";

  const { user, logout, isAuthenticated, checkTokenValidity } = useAuth();

  const pathClassMap = {
    "/": styles.onHomePage,
    "/about": "",
    "/map": "",
  };

  const sideClass = pathClassMap[location.pathname] || ""; // Get the class from the dictionary or use an empty string if not found
  const userClassNames = `${styles.user} ${sideClass}`;

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
    <div className={userClassNames}>
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
