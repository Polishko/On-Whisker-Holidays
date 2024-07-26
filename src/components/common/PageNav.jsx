import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";
import { useAuth } from "../contexts/AuthContext";

function PageNav({ style }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();

  const defaultStyle = {
    backgroundColor: "#ffb000",
    color: "#21413f",
    fontWeight: "bold",
  };

  const appliedStyle = style || defaultStyle;

  return (
    <nav className={styles.nav}>
      <Logo background={currentPath === "/" ? "dark" : "light"} />
      <ul>
        {currentPath !== "/" && (
          <li>
            <NavLink
              style={appliedStyle}
              to="/"
              className={`${styles.ctaLink} ${styles.navButton}`}
            >
              Home
            </NavLink>
          </li>
        )}
        {currentPath !== "/login" && !user && (
          <li>
            <NavLink
              style={appliedStyle}
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
              style={appliedStyle}
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
              style={appliedStyle}
              to="/map"
              className={`${styles.ctaLink} ${styles.navButton}`}
            >
              Map
            </NavLink>
          </li>
        )}
        {(currentPath === "/map" ||
          currentPath === "/login" ||
          currentPath === "/register") && (
          <li>
            <NavLink
              style={appliedStyle}
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
