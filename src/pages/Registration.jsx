import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "./Registration.module.css";

import { useUsers } from "../components/contexts/UsersContext";
import { useModal } from "../hooks/useModal";
import { useKey } from "../hooks/useKey";

import Button from "../components/common/Button";
import PageNav from "../components/common/PageNav";
import AvatarSelection from "../components/common/AvatarSelection";
import Modal from "../components/modal/Modal";

function Registration() {
  const avatars = [
    { id: "cat1", src: "/avatar/cat1.png" },
    { id: "cat2", src: "/avatar/cat2.png" },
    { id: "cat3", src: "/avatar/cat3.png" },
    { id: "dog1", src: "/avatar/dog1.png" },
    { id: "dog2", src: "/avatar/dog2.png" },
    { id: "dog3", src: "/avatar/dog3.png" },
  ];

  const { fetchUsers, createUser, resetState } = useUsers();
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { isModalOpen, modalMessage, openModal, closeModal } = useModal();

  const password = watch("password");

  const onSubmit = async (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: `/avatar/${data.selectedAvatar}.png`,
    };

    const result = await createUser(newUser);
    if (result.success) {
      await fetchUsers();
      setSuccess(true);
      reset();
    } else {
      setSuccess(false);
      openModal(result.message);
      reset();
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useKey("Escape", () => {
    if (isModalOpen) {
      closeModal();
    }
  });

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
    return resetState; // clear context upon navigating elsewhere
  }, [success, navigate, resetState]);

  // Ensure selected avatar is set correctly
  useEffect(() => {
    setValue("selectedAvatar", "cat1");
  }, [setValue]);

  return (
    <main className={styles.registrationPage}>
      <PageNav />

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <header className={styles.registerHeader}>
          Register / or{" "}
          <NavLink to="/login" className={styles.loginInvite}>
            Login here
          </NavLink>
        </header>

        <div className={styles.row}>
          <label htmlFor="name">Enter username</label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-user ${styles.icon}`}></i>
            <input
              type="text"
              id="name"
              placeholder="Username"
              autoComplete="off"
              {...register("name", { required: "Username is required" })}
            />
          </div>
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Enter your email</label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-envelope ${styles.icon}`}></i>
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
            />
          </div>
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Enter a strong password</label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-lock ${styles.icon}`}></i>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              autoComplete="new-password"
              {...register("password", { required: "Password is required" })}
            />
            <span onClick={toggleShowPassword} className={styles.eyeIcon}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <div className={styles.row}>
          <label htmlFor="confirmPassword">Confirm your password</label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-lock ${styles.icon}`}></i>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            <span onClick={toggleShowPassword} className={styles.eyeIcon}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className={styles.bottom}>
          <div className={styles.left}>
            <p>Choose an avatar</p>
            <AvatarSelection
              avatars={avatars}
              selectedAvatar={watch("selectedAvatar") || "cat1"}
              handleAvatarChange={(e) =>
                setValue("selectedAvatar", e.target.value)
              }
            />
          </div>
        </div>

        <Button type={"primary"} className={styles.buttonStyle}>
          Register
        </Button>
      </form>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <p>{modalMessage}</p>
        </Modal>
      )}
    </main>
  );
}

export default Registration;
