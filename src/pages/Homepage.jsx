import { NavLink } from "react-router-dom";
import Button from "../components/common/Button";
import PageNav from "../components/common/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  const colorStyle = {
    backgroundColor: "#53c0bb",
    color: "#eee",
    fontWeight: "bold",
  };

  return (
    <main className={styles.homepage}>
      <PageNav style={colorStyle} />

      <section>
        <h1>
          Enjoy your favorite destinations
          <br />
          together with your belowed furry pals.
        </h1>
        <h2>
          Find whisker frienly hotels using an intuitive map, check for
          availability and reserve. <br /> Join the pet humans community to
          share your adventures, rate places and more...
        </h2>

        <div className={styles.goToApp}>
          <NavLink to="/hotels">
            <Button type={"primary"}>Start you adventure now!</Button>
          </NavLink>
        </div>
      </section>
    </main>
  );
}
