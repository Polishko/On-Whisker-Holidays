import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../components/common/Button";
import PageNav from "../components/common/PageNav";
import styles from "./Login.module.css";
import { useAuth } from "../components/contexts/AuthContext";
import { useEffect, useState } from "react";
import Modal from "../components/modal/Modal";
import { useKey } from "../hooks/useKey";

function Login() {
  const { login, error, isAuthenticated, resetError } = useAuth();
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/hotels", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      setModalMessage(error);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      resetError();
    };
  }, [resetError]);

  function closeModal() {
    setModalMessage("");
  }

  useKey("Escape", closeModal);

  async function onSubmit(data) {
    try {
      await login({ email: data.email, password: data.password });
      reset();
    } catch (error) {
      // Handle error if needed
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />

      <form
        className={`${styles.form} ${styles["login-form"]}`}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
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
              placeholder="Email"
              autoComplete="off"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              onKeyUp={() => trigger("email")}
            />
          </div>
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Enter your password</label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-lock ${styles.icon}`}></i>
            <input
              type="password"
              id="password"
              placeholder="Password"
              autoComplete="new-password"
              {...register("password", { required: "Password is required" })}
              onKeyUp={() => trigger("password")}
            />
          </div>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" className={styles["button-style"]}>
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
        <Modal onClose={closeModal}>{<p>{modalMessage}</p>}</Modal>
      )}
    </main>
  );
}

export default Login;
