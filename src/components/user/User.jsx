import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";

function User() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt="User Avatar" />
      <p>{user.name}</p>
      <button>Logout</button>
    </div>
  );
}

export default User;
