import styles from "./About.module.css";

import PageNav from "../components/common/PageNav";

function About() {
  return (
    <main className={styles.aboutPage}>
      <PageNav />
      <div className={styles.container}>
        <div className={styles.smallShape1}></div>
        <div className={styles.text}>
          <h1>About</h1>
          <p>
            This web page is dedicated to our beloved Gizmo, with whom we have
            shared our lives since 2008.
          </p>
          <p>
            Because of her special needs, we weren&apos;t able to leave her in
            someone else&apos;s care, and the idea for this site was born during
            our search for accommodation options that allow traveling with
            animal friends.
          </p>
          <p>
            We hope all humans who share their lives with animal companions find
            this site helpful and discover holiday ideas suitable for their own
            needs.
            <span className={styles.happyTravels}> Happy travels!</span>
          </p>
        </div>
        <div className={styles.smallShape2}></div>
      </div>
    </main>
  );
}

export default About;
