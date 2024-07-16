import styles from "./Profile.module.css";
import { useAuth } from "../components/contexts/AuthContext";
import { useUsers } from "../components/contexts/UsersContext";
import { useState } from "react";
import Button from "../components/Common/Button";
import AvatarSelection from "../components/Common/AvatarSelection";
import Modal from "../components/Common/Modal";
import { useKey } from "../hooks/useKey";

function Profile({ onClose }) {
  const { user, logout } = useAuth();
  const { editUser, validatePassword } = useUsers();
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const currentAvatar = user.avatar;

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
      const { isValid, message } = await validatePassword(credentials);

      if (!password) {
        passwordFieldReset();
        alert("Password field can't be empty");
        return;
      }

      if (!isValid) {
        passwordFieldReset();
        alert(message);
        return;
      }

      const updatedAvatarPath =
        avatars.find((avatar) => avatar.id === selectedAvatar)?.src ||
        user.avatar;

      const updatedUser = { ...user, avatar: updatedAvatarPath, password };
      await editUser(updatedUser);

      alert("Avatar updated successfully!");
      setIsPasswordModalOpen(false);
      onClose();
    } catch (currentError) {
      alert("There was an error updating the avatar.");
    }
  }

  function openPasswordModal() {
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
    setPassword(e.target.value);
  }

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
        <Button onClick={openPasswordModal} type="primary">
          Save Changes
        </Button>
        <Button onClick={handleLogoutClick} type="primary">
          Logout
        </Button>
      </div>
      {isPasswordModalOpen && (
        <Modal
          onClose={closePasswordModal}
          customClass="customModalButton"
          showCloseButton={false}
        >
          <div>
            <h3>Enter Password</h3>
            <input
              type="password"
              value={password}
              onChange={handlePasswordSubmit}
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
