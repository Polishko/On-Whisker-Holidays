// import styles from "./Profile.module.css";
// import { useAuth } from "../components/contexts/AuthContext";
// import { useUsers } from "../components/contexts/UsersContext";
// import { useState } from "react";
// import Button from "../components/Common/Button";
// import AvatarSelection from "../components/Common/AvatarSelection";

// function Profile({ onClose }) {
//   const { user, logout, deleteUser } = useAuth();
//   const { editUser } = useUsers();
//   const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);

//   const avatars = [
//     { id: "cat1", src: "/avatar/cat1.png" },
//     { id: "cat2", src: "/avatar/cat2.png" },
//     { id: "cat3", src: "/avatar/cat3.png" },
//     { id: "dog1", src: "/avatar/dog1.png" },
//     { id: "dog2", src: "/avatar/dog2.png" },
//     { id: "dog3", src: "/avatar/dog3.png" },
//   ];

//   function handleAvatarChange(e) {
//     setSelectedAvatar(e.target.value);
//   }

//   function handleLogoutClick() {
//     onClose();
//     logout();
//   }

//   async function handleSaveChanges() {
//     try {
//       // Ensure the correct avatar path is set
//       const updatedAvatarPath =
//         avatars.find((avatar) => avatar.id === selectedAvatar)?.src ||
//         user.avatar;

//       const updatedUser = await editUser({
//         ...user,
//         avatar: updatedAvatarPath,
//         password: user.password, // Ensure password is included
//       });
//       console.log("Update successful:", updatedUser); // Log the updated user
//       alert("Avatar updated successfully!");
//     } catch (error) {
//       console.error("Update failed:", error); // Log the error
//       alert("There was an error updating the avatar.");
//     }
//   }

//   async function handleDeleteAccount() {
//     deleteUser(user.id);
//   }

//   return (
//     <div className={styles.profile}>
//       <h2>{user.name}</h2>
//       <div className={styles.currentAvatar}>
//         <img src={user.avatar} alt="User Avatar" />
//       </div>
//       <div className={styles.profileInfo}>
//         <label>
//           <span>Change avatar:</span>
//           <AvatarSelection
//             avatars={avatars}
//             selectedAvatar={selectedAvatar}
//             handleAvatarChange={handleAvatarChange}
//           />
//         </label>
//       </div>
//       <div className={styles.buttons}>
//         <Button onClick={handleSaveChanges} type="primary">
//           Save Changes
//         </Button>
//         <Button onClick={handleDeleteAccount} type="secondary">
//           Delete Account
//         </Button>
//         <Button onClick={handleLogoutClick} type="primary">
//           Logout
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import styles from "./Profile.module.css";
import { useAuth } from "../components/contexts/AuthContext";
import { useUsers } from "../components/contexts/UsersContext";
import { useState } from "react";
import Button from "../components/Common/Button";
import AvatarSelection from "../components/Common/AvatarSelection";
import Modal from "../components/Common/Modal";

function Profile({ onClose }) {
  const { user, logout, deleteUser } = useAuth();
  const { editUser } = useUsers();
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");

  const avatars = [
    { id: "cat1", src: "/avatar/cat1.png" },
    { id: "cat2", src: "/avatar/cat2.png" },
    { id: "cat3", src: "/avatar/cat3.png" },
    { id: "dog1", src: "/avatar/dog1.png" },
    { id: "dog2", src: "/avatar/dog2.png" },
    { id: "dog3", src: "/avatar/dog3.png" },
  ];

  function handleAvatarChange(e) {
    setSelectedAvatar(e.target.value);
  }

  function handleLogoutClick() {
    onClose();
    logout();
  }

  async function handleSaveChanges() {
    try {
      // Ensure the correct avatar path is set
      const updatedAvatarPath =
        avatars.find((avatar) => avatar.id === selectedAvatar)?.src ||
        user.avatar;

      const updatedUser = { ...user, avatar: updatedAvatarPath, password };
      await editUser(updatedUser);
      // updateAuthUser(updatedUser);

      alert("Avatar updated successfully!");
      setIsPasswordModalOpen(false);
    } catch (error) {
      alert("There was an error updating the avatar.");
    }
  }

  function handleDeleteAccount() {
    deleteUser(user.id);
  }

  function openPasswordModal() {
    setIsPasswordModalOpen(true);
  }

  function closePasswordModal() {
    setIsPasswordModalOpen(false);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className={styles.profile}>
      <h2>{user.name}</h2>
      <div className={styles.currentAvatar}>
        <img src={user.avatar} alt="User Avatar" />
      </div>
      <div className={styles.profileInfo}>
        <label>
          <span>Change avatar:</span>
          <AvatarSelection
            avatars={avatars}
            selectedAvatar={selectedAvatar}
            handleAvatarChange={handleAvatarChange}
          />
        </label>
      </div>
      <div className={styles.buttons}>
        <Button onClick={openPasswordModal} type="primary">
          Save Changes
        </Button>
        <Button onClick={handleDeleteAccount} type="secondary">
          Delete Account
        </Button>
        <Button onClick={handleLogoutClick} type="primary">
          Logout
        </Button>
      </div>
      {isPasswordModalOpen && (
        <Modal onClose={closePasswordModal} customClass="customModalButton">
          <div>
            <h3>Enter Password</h3>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              autoComplete="new-password"
              name={`modal-password_${Math.random().toString(36).substring(2)}`}
            />
            <div className={styles.modalButtons}>
              <Button onClick={handleSaveChanges} type="primary">
                Submit
              </Button>
              <Button onClick={closePasswordModal} type="secondary">
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Profile;
