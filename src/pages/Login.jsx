import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useAuth } from "../components/contexts/AuthContext";
import { useEffect, useState } from "react";
import Modal from "../components/Common/Modal";
import { useKey } from "../hooks/useKey";

function Login() {
  const { login, error, isAuthenticated, resetError } = useAuth();
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    resetForm();
    if (error) {
      setModalMessage(error);
    }
  }, [error, setModalMessage]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/hotels", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      resetError();
    };
  }, []);

  function resetForm() {
    setFormData({
      email: "",
      password: "",
    });
  }

  function closeModal() {
    setModalMessage("");
  }

  useKey("Escape", closeModal);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login({ email: formData.email, password: formData.password });
    } catch (error) {
      // console.error("Login failed:", error);
    }
  }

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
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
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

      {modalMessage && (
        <Modal onClose={closeModal}>
          <p>{modalMessage}</p>
        </Modal>
      )}
    </main>
  );
}

export default Login;
