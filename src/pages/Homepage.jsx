import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          Travel with your belowed non-human friends!
          <br />
          Enjoy your favorite destinations together with your furry friend.
        </h1>
        <h2>
          Find pet-frienly hotels using an intuitive map, check for availability
          and reserve.
        </h2>
        <h2>
          Want to recommend your favorite place to others? Join the pet humans
          community, share your adventures, rate places and more...
        </h2>
        <button>Start you adventure now!</button>
      </section>
    </main>
  );
}
