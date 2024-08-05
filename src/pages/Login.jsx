import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./Login.module.css";

import { useAuth } from "../components/contexts/AuthContext";
import { useModal } from "../hooks/useModal";
import { useKey } from "../hooks/useKey";

import Button from "../components/common/Button";
import PageNav from "../components/common/PageNav";
import Modal from "../components/modal/Modal";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { isModalOpen, modalMessage, openModal, closeModal } = useModal();

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

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  async function onSubmit(data) {
    const result = await login({ email: data.email, password: data.password });
    if (result.success) {
      openModal("Login successful!");
    } else {
      openModal(result.message);
    }
    reset();
  }

  useKey("Escape", () => {
    if (isModalOpen) {
      closeModal();
    }
  });

  return (
    <main className={styles.loginPage}>
      <PageNav />

      <form
        className={`${styles.form} ${styles.loginForm}`}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <header className={styles.loginHeader}>Login</header>

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
            <span onClick={toggleShowPassword} className={styles.eyeIcon}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <Button type={"primary"} className={styles.buttonStyle}>
          Login
        </Button>

        <div className={styles.registerInvite}>
          <span>
            Don&apos;t have an account?
            <Link to="/register">Register here</Link>
          </span>
        </div>
      </form>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <p>{modalMessage}</p>
        </Modal>
      )}
    </main>
  );
}

export default Login;
