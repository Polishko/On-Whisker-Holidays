import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  function openProfile(e) {
    e.preventDefault();
    navigate("profile", { state: { modal: true } });
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
        Profile
      </NavLink>
    </div>
  );
}

export default User;
