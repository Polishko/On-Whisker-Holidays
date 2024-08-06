import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();

  const setNavLinkStyle = () => {
    if (currentPath === "/") {
      return {
        backgroundColor: "#d7dfe3",
        color: "#2b3425",
        fontWeight: "bold",
      };
    } else {
      return {
        backgroundColor: "#a5c981",
        color: "#544501",
        fontWeight: "bold",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
      };
    }
  };

  const appliedStyle = setNavLinkStyle();

  return (
    <nav className={styles.nav}>
      <Logo
        background={
          currentPath === "/" || currentPath === "/login" ? "dark" : "light"
        }
      />
      <ul>
        {currentPath !== "/" && (
          <li>
            <NavLink style={appliedStyle} to="/">
              Home
            </NavLink>
          </li>
        )}
        {currentPath !== "/login" && !user && (
          <li>
            <NavLink style={appliedStyle} to="/login">
              Login
            </NavLink>
          </li>
        )}
        {currentPath !== "/register" && !user && (
          <li>
            <NavLink style={appliedStyle} to="/register">
              Register
            </NavLink>
          </li>
        )}
        {(currentPath === "/login" ||
          currentPath === "/register" ||
          currentPath === "/about") && (
          <li>
            <NavLink style={appliedStyle} to="/hotels">
              Search Hotels
            </NavLink>
          </li>
        )}
        {currentPath !== "/about" && (
          <li>
            <NavLink style={appliedStyle} to="/about">
              About
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default PageNav;
