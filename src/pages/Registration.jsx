import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import PageNav from "../components/PageNav";
import { useUsers } from "../components/contexts/UsersContext";
import AvatarSelection from "../components/Common/AvatarSelection";
import styles from "./Registration.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "../components/Common/Modal";
import { useKey } from "../hooks/useKey";

function Registration() {
  const avatars = [
    { id: "cat1", src: "/avatar/cat1.png" },
    { id: "cat2", src: "/avatar/cat2.png" },
    { id: "cat3", src: "/avatar/cat3.png" },
    { id: "dog1", src: "/avatar/dog1.png" },
    { id: "dog2", src: "/avatar/dog2.png" },
    { id: "dog3", src: "/avatar/dog3.png" },
  ];

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    selectedAvatar: "cat1",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { createUser, error, resetState, currentUser } = useUsers();
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setModalMessage(error);
      resetForm();
    }
  }, [error]);

  useEffect(() => {
    if (currentUser.name) {
      resetState();
      navigate("/login", { replace: true });
    }
  }, [currentUser.name, navigate, resetState]);

  function resetForm() {
    setFormData({
      email: "",
      name: "",
      password: "",
      selectedAvatar: "cat1",
    });
  }

  function closeModal() {
    setModalMessage("");
  }

  useKey("Escape", closeModal);

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: `/avatar/${formData.selectedAvatar}.png`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((oldFormData) => ({ ...oldFormData, [name]: value }));
  }

  function handleAvatarChange(e) {
    setFormData((oldFormData) => ({
      ...oldFormData,
      selectedAvatar: e.target.value,
    }));
  }

  function toggleShowPassword() {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  return (
    <main className={styles.registration}>
      <PageNav />

      <form
        className={`${styles.form}`}
        onSubmit={(e) => {
          handleRegister(e);
        }}
      >
        <header>Register here</header>

        <div className={styles.row}>
          <label htmlFor="name">Enter username</label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-user ${styles.icon}`}></i>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Username"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Enter your email</label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-envelope ${styles.icon}`}></i>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Enter a strong password</label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-lock ${styles.icon}`}></i>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span onClick={toggleShowPassword} className={styles.eyeIcon}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <div className={styles.row}></div>

        <div className={styles.bottom}>
          <div className={styles.left}>
            <p>Choose an avatar</p>
            <AvatarSelection
              avatars={avatars}
              selectedAvatar={formData.selectedAvatar}
              handleAvatarChange={handleAvatarChange}
            />
          </div>
        </div>

        <Button type={"submit"} className={styles["button-style"]}>
          Register
        </Button>
      </form>

      <Modal message={modalMessage} onClose={closeModal} />
    </main>
  );
}

export default Registration;
