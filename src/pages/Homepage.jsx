import { NavLink } from "react-router-dom";
import Button from "../components/common/Button";
import PageNav from "../components/common/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          Enjoy your favorite destinations
          <br />
          together with your beloved furry pals.
        </h1>
        <h2>
          Find whisker-friendly hotels, use an intuitive map, and check for
          facilities. <br /> Register and join the pet humans community to share
          your adventures, rate places, and more...
        </h2>

        <div className={styles.goToApp}>
          <NavLink to="/hotels">
            <Button type={"tertiary"}>Start you adventure now!</Button>
          </NavLink>
        </div>
      </section>
    </main>
  );
}
