// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "../components/common/Button";
// import PageNav from "../components/common/PageNav";
// import { useUsers } from "../components/contexts/UsersContext";
// import AvatarSelection from "../components/common/AvatarSelection";
// import styles from "./Registration.module.css";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// function Registration() {
//   const avatars = [
//     { id: "cat1", src: "/avatar/cat1.png" },
//     { id: "cat2", src: "/avatar/cat2.png" },
//     { id: "cat3", src: "/avatar/cat3.png" },
//     { id: "dog1", src: "/avatar/dog1.png" },
//     { id: "dog2", src: "/avatar/dog2.png" },
//     { id: "dog3", src: "/avatar/dog3.png" },
//   ];

//   const [formData, setFormData] = useState({
//     email: "",
//     name: "",
//     password: "",
//     selectedAvatar: "cat1",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const { fetchUsers, createUser, resetState } = useUsers();
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     const newUser = {
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//       avatar: `/avatar/${formData.selectedAvatar}.png`,
//     };
//     const result = await createUser(newUser);
//     if (result.success) {
//       await fetchUsers();
//       setSuccess(true);
//       alert(result.message);
//       resetForm();
//     } else {
//       setSuccess(false);
//       alert(result.message);
//       resetForm();
//     }
//   };

//   useEffect(() => {
//     if (success) {
//       navigate("/login");
//     }
//     return resetState;
//   }, [success, navigate, resetState]);

//   const resetForm = () => {
//     setFormData({
//       email: "",
//       name: "",
//       password: "",
//       selectedAvatar: "cat1",
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((oldFormData) => ({ ...oldFormData, [name]: value }));
//   };

//   const handleAvatarChange = (e) => {
//     setFormData((oldFormData) => ({
//       ...oldFormData,
//       selectedAvatar: e.target.value,
//     }));
//   };

//   const toggleShowPassword = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   return (
//     <main className={styles.registration}>
//       <PageNav />

//       <form className={styles.form} onSubmit={handleRegister}>
//         <header>Register</header>

//         <div className={styles.row}>
//           <label htmlFor="name">Enter username</label>
//           <div className={styles.inputContainer}>
//             <i className={`bx bx-user ${styles.icon}`}></i>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Username"
//               autoComplete="off"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className={styles.row}>
//           <label htmlFor="email">Enter your email</label>
//           <div className={styles.inputContainer}>
//             <i className={`bx bx-envelope ${styles.icon}`}></i>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               autoComplete="off"
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className={styles.row}>
//           <label htmlFor="password">Enter a strong password</label>
//           <div className={styles.inputContainer}>
//             <i className={`bx bx-lock ${styles.icon}`}></i>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               placeholder="Password"
//               autoComplete="new-password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//             <span onClick={toggleShowPassword} className={styles.eyeIcon}>
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//         </div>

//         <div className={styles.bottom}>
//           <div className={styles.left}>
//             <p>Choose an avatar</p>
//             <AvatarSelection
//               avatars={avatars}
//               selectedAvatar={formData.selectedAvatar}
//               handleAvatarChange={handleAvatarChange}
//             />
//           </div>
//         </div>

//         <Button type="submit" className={styles["button-style"]}>
//           Register
//         </Button>
//       </form>
//     </main>
//   );
// }

// export default Registration;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../components/common/Button";
import PageNav from "../components/common/PageNav";
import { useUsers } from "../components/contexts/UsersContext";
import AvatarSelection from "../components/common/AvatarSelection";
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
      alert(result.message);
      reset();
    } else {
      setSuccess(false);
      alert(result.message);
      reset();
    }
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
    return resetState;
  }, [success, navigate, resetState]);

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Ensure selected avatar is set correctly
  useEffect(() => {
    setValue("selectedAvatar", "cat1");
  }, [setValue]);

  return (
    <main className={styles.registration}>
      <PageNav />

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <header>Register</header>

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

        <Button type="submit" className={styles["button-style"]}>
          Register
        </Button>
      </form>
    </main>
  );
}

export default Registration;
