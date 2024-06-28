import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";
import styles from "./PageNav.module.css";

function PageNav() {
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
      </ul>
    </nav>
  );
}

export default PageNav;
