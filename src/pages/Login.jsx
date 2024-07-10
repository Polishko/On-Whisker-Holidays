import { Link } from "react-router-dom";
import Button from "../components/Common/Button";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";

function Login() {
  function handleLogin(e) {
    e.preventDefault();
  }

  return (
    <main className={styles.login}>
      <PageNav />

      <form
        className={`${styles.form} ${styles["login-form"]}`}
        onSubmit={handleLogin}
      >
        <div className={styles["login-header"]}>
          <span>Have an account?</span>
          <header>Login</header>
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
        <div className={styles.bottom}>
          <div className={styles.left}>
            <input type="checkbox" id="check" className={styles.checkbox} />
            <label htmlFor="check"> Remember Me</label>
          </div>
          {/* <div className={styles.right}>
            <label>
              <a href="#">Forgot password?</a>
            </label>
          </div> */}
        </div>
        <Button type={"submit"} className={styles["button-style"]}>
          Login
        </Button>
        <div className={styles["register-invite"]}>
          <span>
            Don&apos;t have an account?{" "}
            <Link to="/register">Register here</Link>
          </span>
        </div>
      </form>
    </main>
  );
}

export default Login;
