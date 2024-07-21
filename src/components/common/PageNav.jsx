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
      <Logo background={currentPath === "/" ? "dark" : "light"} />
      <ul>
        {currentPath !== "/login" && !user && (
          <li>
            <NavLink
              to="/login"
              className={`${styles.ctaLink} ${styles.navButton}`}
            >
              Login
            </NavLink>
          </li>
        )}
        {currentPath !== "/register" && !user && (
          <li>
            <NavLink
              to="/register"
              className={`${styles.ctaLink} ${styles.navButton}`}
            >
              Register
            </NavLink>
          </li>
        )}
        {currentPath !== "/map" && (
          <li>
            <NavLink
              to="/map"
              className={`${styles.ctaLink} ${styles.navButton}`}
            >
              Map
            </NavLink>
          </li>
        )}
        {!currentPath.startsWith("/hotels") &&
          !currentPath.startsWith("/search") &&
          !currentPath !== "/" && (
            <li>
              <NavLink
                to="/hotels"
                className={`${styles.ctaLink} ${styles.navButton}`}
              >
                Search Hotels
              </NavLink>
            </li>
          )}
      </ul>
    </nav>
  );
}

export default PageNav;
