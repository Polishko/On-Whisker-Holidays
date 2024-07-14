import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useAuth } from "../components/contexts/AuthContext";
import { useEffect, useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  useEffect(
    function () {
      if (isAuthenticated === true) navigate("/hotels", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />

      <form
        className={`${styles.form} ${styles["login-form"]}`}
        onSubmit={handleSubmit}
      >
        <div className={styles["login-header"]}>
          <span>Have an account?</span>
          <header>Login</header>
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Enter your email</label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-user ${styles.icon}`}></i>
            <input
              type="email"
              id="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Enter your password</label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-lock ${styles.icon}`}></i>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
