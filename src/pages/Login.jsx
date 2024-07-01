import PageNav from "../components/PageNav";
import styles from "./Login.module.css";

function Login() {
  return (
    <main className={styles.login}>
      <PageNav />
      <div className={styles.forms}>
        <form className={`${styles.form} ${styles["login-form"]}`}>
          <div className={styles.row}>
            <label htmlFor="email" id="email">
              Enter your email
            </label>
            <input type="email" />
          </div>
          <div className={styles.row}>
            <label htmlFor="password" id="email">
              Enter your password
            </label>
            <input type="password" />
          </div>
        </form>
        {/* <form className={`${styles.form} ${styles["register-form"]}`}>
          <div className={styles.row}>
            <label htmlFor="email" id="email">
              Enter your email
            </label>
            <input type="email" />
          </div>
          <div className={styles.row}>
            <label htmlFor="password" id="email">
              Enter your password
            </label>
            <input type="password" />
            <label htmlFor="password" id="email">
              Repeat password
            </label>
            <input type="password" />
          </div>
        </form> */}
      </div>
    </main>
  );
}

export default Login;
