import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Common/Logo";
import styles from "./PageNav.module.css";
import { useAuth } from "./contexts/AuthContext";

function PageNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();

  return (
    <nav className={styles.nav}>
      <Logo background={currentPath === "/app" ? "light" : "dark"} />
      <ul>
        {currentPath !== "/login" && !user && (
          <li>
            <NavLink
              to="/login"
              className={`${styles.ctaLink} ${styles.login}`}
            >
              Login
            </NavLink>
          </li>
        )}
        {currentPath !== "/register" && !user && (
          <li>
            <NavLink
              to="/register"
              className={`${styles.ctaLink} ${styles.register}`}
            >
              Register
            </NavLink>
          </li>
        )}
        {currentPath !== "/gallery" && (
          <li>
            <NavLink
              to="/gallery"
              className={`${styles.ctaLink} ${styles.join}`}
            >
              Gallery
            </NavLink>
          </li>
        )}
        {currentPath !== "/app" && (
          <li>
            <NavLink to="/app" className={`${styles.ctaLink} ${styles.join}`}>
              Search Hotels
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default PageNav;
