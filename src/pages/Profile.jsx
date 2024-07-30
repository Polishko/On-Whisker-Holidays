import { useState } from "react";

import styles from "./Profile.module.css";

import { useAuth } from "../components/contexts/AuthContext";
import { useUsers } from "../components/contexts/UsersContext";
import { useKey } from "../hooks/useKey";
import { useCheckAuth } from "../hooks/useCheckTokenValidity";

import Button from "../components/common/Button";
import AvatarSelection from "../components/common/AvatarSelection";
import PasswordModal from "../components/modal/PasswordModal";

function Profile({ onClose }) {
  const { user, logout, validatePassword } = useAuth();
  const checkAuth = useCheckAuth();
  const { editUser, fetchUsers } = useUsers();

  const [selectedAvatar, setSelectedAvatar] = useState("");
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

  function passwordFieldReset() {
    setPassword("");
  }

  function handleAvatarChange(e) {
    setSelectedAvatar(e.target.value);
  }

  function handleLogoutClick() {
    onClose();
    logout();
  }

  async function handleSaveChanges() {
    try {
      const credentials = { email: user.email, password: password };
      const { success, message } = await validatePassword(credentials);

      if (!password) {
        passwordFieldReset();
        alert("Password field can't be empty");
        return;
      }

      if (!success) {
        passwordFieldReset();
        alert(message);
        return;
      }

      const updatedAvatarPath =
        avatars.find((avatar) => avatar.id === selectedAvatar)?.src ||
        user.avatar;

      const updatedUser = { ...user, avatar: updatedAvatarPath, password };
      const result = await editUser(updatedUser);

      if (result.success) {
        alert("Avatar updated successfully!");
        setIsPasswordModalOpen(false);
        onClose();
        await fetchUsers();
      } else {
        alert(result.message);
      }
    } catch (currentError) {
      alert("There was an error updating the avatar.");
    }
  }

  function openPasswordModal() {
    if (!checkAuth()) return;
    const selectedAvatarPath =
      avatars.find((avatar) => avatar.id === selectedAvatar)?.src || "";

    if (selectedAvatarPath === "") {
      alert("Select an avatar!");
      return;
    }

    if (selectedAvatarPath === user.avatar) {
      alert("Select a different avatar than the current one!");
      return;
    }
    setIsPasswordModalOpen(true);
  }

  function closePasswordModal() {
    setIsPasswordModalOpen(false);
  }

  function handlePasswordSubmit(e) {
    if (!checkAuth()) return;
    setPassword(e.target.value);
  }

  // key press actions
  useKey("Escape", () => {
    if (isPasswordModalOpen) {
      closePasswordModal();
    } else {
      onClose();
    }
  });

  useKey("Enter", () => {
    if (isPasswordModalOpen) handleSaveChanges();
  });

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
        <Button onClick={openPasswordModal} type="tertiary">
          Save Changes
        </Button>
        <Button onClick={handleLogoutClick} type="tertiary">
          Logout
        </Button>
      </div>

      {isPasswordModalOpen && (
        <PasswordModal
          closePasswordModal={closePasswordModal}
          handlePasswordSubmit={handlePasswordSubmit}
          handleSaveChanges={handleSaveChanges}
          password={password}
        />
      )}
    </div>
  );
}

export default Profile;
