import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Profile.module.css";

import { useAuth } from "../components/contexts/AuthContext";
import { useUsers } from "../components/contexts/UsersContext";
import { useKey } from "../hooks/useKey";
import { useModal } from "../hooks/useModal";

import Button from "../components/common/Button";
import AvatarSelection from "../components/common/AvatarSelection";
import PasswordModal from "../components/modal/PasswordModal";
import Modal from "../components/modal/Modal";

function Profile() {
  const {
    user,
    logout,
    validatePassword,
    isAuthenticated,
    checkTokenValidity,
  } = useAuth();
  const { editUser, fetchUsers } = useUsers();
  const navigate = useNavigate();

  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [modalType, setModalType] = useState("");

  const { isModalOpen, modalMessage, openModal, closeModal } = useModal();

  const avatars = [
    { id: "cat1", src: "/avatar/cat1.png" },
    { id: "cat2", src: "/avatar/cat2.png" },
    { id: "cat3", src: "/avatar/cat3.png" },
    { id: "dog1", src: "/avatar/dog1.png" },
    { id: "dog2", src: "/avatar/dog2.png" },
    { id: "dog3", src: "/avatar/dog3.png" },
  ];

  const handleAvatarChange = (e) => {
    setSelectedAvatar(e.target.value);
  };

  const handleLogoutClick = () => {
    logout();
  };

  const handleAvatarSelection = () => {
    checkTokenValidity();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const selectedAvatarPath =
      avatars.find((avatar) => avatar.id === selectedAvatar)?.src || "";

    if (selectedAvatarPath === "") {
      setModalType("message");
      openModal("Select an avatar!");
      return;
    }

    if (selectedAvatarPath === user.avatar) {
      setModalType("message");
      openModal("Select a different avatar than the current one!");
      return;
    }
    setModalType("password");
    openModal();
  };

  async function handleSaveChanges() {
    try {
      const credentials = { email: user.email, password: password };
      const { success, message } = await validatePassword(credentials);

      if (!password) {
        setPassword("");
        setModalType("message");
        openModal("Password field can't be empty");
        return;
      }

      if (!success) {
        setPassword("");
        setModalType("message");
        openModal(message);
        return;
      }

      const updatedAvatarPath =
        avatars.find((avatar) => avatar.id === selectedAvatar)?.src ||
        user.avatar;

      const updatedUser = { ...user, avatar: updatedAvatarPath, password };
      const result = await editUser(updatedUser);

      if (result.success) {
        setModalType("message");
        openModal("Avatar updated successfully!");
        await fetchUsers();
      } else {
        setModalType("message");
        openModal(result.message);
      }
      setPassword("");
      closeModal();
    } catch (currentError) {
      setPassword("");
      setModalType("message");
      openModal("There was an error updating the avatar.");
      closeModal();
    }
  }

  const handlePasswordSubmit = (e) => {
    checkTokenValidity();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setPassword(e.target.value);
  };

  const handleClicktoHotelList = () => {
    navigate("/hotels");
  };

  // key press actions
  useKey("Escape", () => {
    if (isModalOpen) {
      closeModal();
    } else {
      handleClicktoHotelList();
    }
  });

  useKey("Enter", () => {
    if (isModalOpen && modalType === "password") handleSaveChanges();
  });

  return (
    <main className={styles.profilePage}>
      <div className={styles.profile}>
        <Button
          className={styles.toHotelList}
          onClick={handleClicktoHotelList}
          type="primary"
        >
          &larr; To hotel list
        </Button>
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
          <Button onClick={handleAvatarSelection} type="tertiary">
            Save Changes
          </Button>
          <Button onClick={handleLogoutClick} type="tertiary">
            Logout
          </Button>
        </div>

        {isModalOpen && (
          <Modal onClose={closeModal} showCloseButton={modalType === "message"}>
            {modalType === "message" ? (
              <p>{modalMessage}</p>
            ) : (
              <PasswordModal
                closePasswordModal={closeModal}
                handlePasswordSubmit={handlePasswordSubmit}
                handleSaveChanges={handleSaveChanges}
                password={password}
              />
            )}
          </Modal>
        )}
      </div>
    </main>
  );
}

export default Profile;
