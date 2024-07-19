import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { useAuth } from "../contexts/AuthContext";

function PageNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();

  return (
    <nav className={styles.nav}>
      <Logo background={currentPath === "/hotels" ? "light" : "dark"} />
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
        {/* {currentPath !== "/hotels" && (
          <li>
            <NavLink
              to="/hotels"
              className={`${styles.ctaLink} ${styles.join}`}
            >
              Search Hotels
            </NavLink>
          </li>
        )} */}
      </ul>
    </nav>
  );
}

export default PageNav;
