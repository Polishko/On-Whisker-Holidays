import PageNav from "../components/common/PageNav";
import styles from "./About.module.css";

function About() {
  return (
    <main>
      <PageNav />
      <div className={styles.container}>
        <div className={styles.smallShape1}></div>
        <div className={styles.shape}>
          <div className={styles.text}>
            <h1>About</h1>
            <p>
              This web page is dedicated to our belowed Gizmo, who we share our
              life with since 2008.
            </p>
            <p>
              Because of her special needs, we weren&apos;t able to leave her
              and the idea was born during our search for accomodation options
              that allow traveling with your animal friends.
            </p>
            <p>
              We hope all humans who share their lives with their animal
              friends, would find this site helpful and discover holiday ideas
              suitable for their own needs.{" "}
              <span className={styles.happyTravels}>Happy travels!</span>
            </p>
          </div>
        </div>
        <div className={styles.smallShape2}></div>
      </div>
    </main>
  );
}

export default About;
