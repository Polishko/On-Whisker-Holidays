import { NavLink, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className={styles.nav}>
      <Logo background={currentPath === "/" ? "dark" : "light"} />
      <ul>
        {currentPath !== "/login" && (
          <li>
            <NavLink
              to="/login"
              className={`${styles.ctaLink} ${styles.login}`}
            >
              Login
            </NavLink>
          </li>
        )}
        {currentPath !== "/register" && (
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
