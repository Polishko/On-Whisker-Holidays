import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          Travel with your belowed furry pals
          <br />
          and enjoy your favorite destinations together.
        </h1>
        <h2>
          Find whisker frienly hotels using an intuitive map, check for
          availability and reserve. Join the pet humans community to share your
          adventures, rate places and more...
        </h2>

        <button>Start you adventure now!</button>
      </section>
    </main>
  );
}
