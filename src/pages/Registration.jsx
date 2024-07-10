import Button from "../components/Common/Button";
import PageNav from "../components/PageNav";
import styles from "./Registration.module.css";

function Registrtion() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className={styles.registration}>
      <PageNav />

      <form
        className={`${styles.form} ${styles["registration-form"]}`}
        onSubmit={handleSubmit}
      >
        <div className={styles["registration-header"]}>
          <header>Register here</header>
        </div>
        <div className={styles.row}>
          <label htmlFor="email" name="email">
            Enter your email
          </label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-user ${styles.icon}`}></i>
            <input type="email" id="email" placeholder="Username" />
          </div>
        </div>

        <div className={styles.row}>
          <label htmlFor="password" name="password">
            Enter your password
          </label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-lock ${styles.icon}`}></i>
            <input type="password" id="password" placeholder="Password" />
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.left}>
            <p>Choose avatar</p>
          </div>
        </div>
        <Button type={"submit"} className={styles["button-style"]}>
          Register
        </Button>
      </form>
    </main>
  );
}

export default Registrtion;
