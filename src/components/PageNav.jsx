import { NavLink, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/login" className={`${styles.ctaLink} ${styles.login}`}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/join" className={`${styles.ctaLink} ${styles.join}`}>
            Join the community
          </NavLink>
        </li>
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
      </ul>
    </nav>
  );
}

export default PageNav;
