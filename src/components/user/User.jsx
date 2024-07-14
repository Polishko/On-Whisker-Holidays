import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";

function User() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt="User Avatar" />
      <p>{user.name}</p>
      <button onClick={logout}>Logout</button>
      <NavLink to="/profile" className={`${styles.ctaLink} ${styles.profile}`}>
        Profile
      </NavLink>
    </div>
  );
}

export default User;
