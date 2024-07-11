import { useState } from "react";
import Button from "../components/Common/Button";
import PageNav from "../components/PageNav";
import { useUsers } from "../components/contexts/UsersContext";
import AvatarSelection from "../components/Common/AvatarSelection";
import styles from "./Registration.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Registration() {
  const avatars = [
    { id: "cat1", src: "/avatar/cat1.png" },
    { id: "cat2", src: "/avatar/cat2.png" },
    { id: "cat3", src: "/avatar/cat3.png" },
    { id: "dog1", src: "/avatar/dog1.png" },
    { id: "dog2", src: "/avatar/dog2.png" },
    { id: "dog3", src: "/avatar/dog3.png" },
  ];

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("cat1");
  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useUsers();

  async function handleRegister(e) {
    e.preventDefault();
    await createUser({
      name,
      email,
      password,
      avatar: `../public/avatar/${selectedAvatar}.png`,
    });
    alert("User registered successfully");
  }

  function handleAvatarChange(e) {
    setSelectedAvatar(e.target.value);
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <main className={styles.registration}>
      <PageNav />

      <form className={`${styles.form}`} onSubmit={handleRegister}>
        <header>Register here</header>

        <div className={styles.row}>
          <label htmlFor="name" name="name">
            Enter username
          </label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-user ${styles.icon}`}></i>
            <input
              type="text"
              id="name"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label htmlFor="email" name="email">
            Enter your email
          </label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-envelope ${styles.icon}`}></i>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <label htmlFor="password" name="password">
            Enter a strong password
          </label>
          <div className={styles.inputContainer}>
            <i className={`bx bx-lock ${styles.icon}`}></i>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              selectedAvatar={selectedAvatar}
              handleAvatarChange={handleAvatarChange}
            />
          </div>
        </div>

        <Button type={"submit"} className={styles["button-style"]}>
          Register
        </Button>
      </form>
    </main>
  );
}

export default Registration;
