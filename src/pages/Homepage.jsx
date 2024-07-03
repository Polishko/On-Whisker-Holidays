import { NavLink } from "react-router-dom";
import Button from "../components/Button";

import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

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
          <NavLink to="/app">
            <Button type={"primary"}>Start you adventure now!</Button>
          </NavLink>
        </div>
      </section>
    </main>
  );
}
