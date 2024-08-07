import { NavLink } from "react-router-dom";

import styles from "./Homepage.module.css";

import { useAuth } from "../components/contexts/AuthContext";

import Button from "../components/common/Button";
import PageNav from "../components/common/PageNav";
import User from "../components/user/User";

export default function Homepage() {
  const { user, isAuthenticated } = useAuth();

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
            <Button type={"tertiary"}>Start your adventure now!</Button>
          </NavLink>
        </div>
      </section>

      {user && isAuthenticated && <User />}
    </main>
  );
}
