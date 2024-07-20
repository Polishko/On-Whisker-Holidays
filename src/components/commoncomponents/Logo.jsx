import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo({ background }) {
  return (
    <Link to="/">
      <img
        src={background === "dark" ? "/Logo5-Оrange-01.png" : "/Logo5-01.png"}
        alt="OnWhiskerHolidays logo"
        className={styles.logo}
      />
    </Link>
  );
}

export default Logo;
