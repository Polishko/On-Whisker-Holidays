import Button from "../components/Common/Button";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";

function Registrtion() {
  return (
    <main className={styles.registration}>
      <PageNav />

      <form className={`${styles.form} ${styles["registration-form"]}`}>
        <div className={styles["registration-header"]}>
          <header>Register here</header>
        </div>
        <div className={styles.row}>
          <label htmlFor="email">Enter your email</label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-user ${styles.icon}`}></i>
            <input type="email" id="email" placeholder="Username" />
          </div>
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Enter your password</label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-lock ${styles.icon}`}></i>
            <input type="password" id="password" placeholder="Password" />
          </div>
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Repeat password</label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-lock ${styles.icon}`}></i>
            <input
              type="password"
              id="password-repeat"
              placeholder="Repeat password"
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <p>Choose avatar</p>
          </div>
        </div>
        <Button type={"primary"} className={styles["button-style"]}>
          Register
        </Button>
      </form>
    </main>
  );
}

export default Registrtion;
