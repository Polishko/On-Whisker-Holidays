import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Profile.module.css";

import { useAuth } from "../components/contexts/AuthContext";
import { useUsers } from "../components/contexts/UsersContext";
import { useKey } from "../hooks/useKey";
import { useModal } from "../hooks/useModal";
import { useAuthenticatedAction } from "../hooks/useAuthenticatedAction";

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
  const executeAuthenticatedAction = useAuthenticatedAction();

  const { editUser, fetchUsers } = useUsers();
  const navigate = useNavigate();

  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [password, setPassword] = useState("");

  const messageModal = useModal();
  const passwordModal = useModal();

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

  const handleAvatarSubmission = () => {
    executeAuthenticatedAction(() => {
      const selectedAvatarPath =
        avatars.find((avatar) => avatar.id === selectedAvatar)?.src || "";

      if (selectedAvatarPath === "") {
        messageModal.openModal("Select an avatar!");
        return;
      }

      if (selectedAvatarPath === user.avatar) {
        messageModal.openModal(
          "Select a different avatar than the current one!"
        );
        return;
      }
      passwordModal.openModal();
    });
  };

  const handlePasswordSubmit = (e) => {
    executeAuthenticatedAction(() => {
      setPassword(e.target.value);
    });
  };

  function handleSaveChanges() {
    executeAuthenticatedAction(async () => {
      try {
        const credentials = { email: user.email, password: password };
        const { success } = await validatePassword(credentials);

        if (!password) {
          messageModal.openModal("Password field can't be empty!");
          setPassword("");
          return;
        }

        if (!success) {
          messageModal.openModal("Wrong password! Please try again.");
          setPassword("");
          return;
        }

        const updatedAvatarPath =
          avatars.find((avatar) => avatar.id === selectedAvatar)?.src ||
          user.avatar;

        const updatedUser = { ...user, avatar: updatedAvatarPath, password };
        const result = await editUser(updatedUser);

        if (result.success) {
          messageModal.openModal("Avatar updated successfully!");
          await fetchUsers();
          passwordModal.closeModal();
        } else {
          messageModal.openModal(result.message);
        }
      } catch (currentError) {
        messageModal("There was an error updating the avatar.");
      } finally {
        setPassword("");
      }
    });
  }

  function handleCloseModal() {
    if (messageModal.isModalOpen) {
      messageModal.closeModal();
    } else if (passwordModal.isModalOpen) {
      passwordModal.closeModal();
      setPassword("");
    }
  }

  const handleClicktoHotelList = () => {
    navigate("/hotels");
  };

  // key press actions
  useKey("Escape", (e) => {
    if (messageModal.isModalOpen) {
      messageModal.closeModal();
    } else if (passwordModal.isModalOpen) {
      passwordModal.closeModal();
      setPassword("");
    }
  });

  useKey("Enter", () => {
    if (messageModal.isModalOpen) {
      messageModal.closeModal();
    } else if (passwordModal.isModalOpen) {
      handleSaveChanges();
    }
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
          <Button onClick={handleAvatarSubmission} type="tertiary">
            Save Changes
          </Button>
          <Button onClick={handleLogoutClick} type="tertiary">
            Logout
          </Button>
        </div>

        {passwordModal.isModalOpen && (
          <Modal onClose={passwordModal.closeModal}>
            <PasswordModal
              closePasswordModal={handleCloseModal}
              handlePasswordSubmit={handlePasswordSubmit}
              handleSaveChanges={handleSaveChanges}
              password={password}
            />
          </Modal>
        )}

        {messageModal.isModalOpen && (
          <Modal onClose={messageModal.closeModal} showCloseButton={true}>
            <p>{messageModal.modalMessage}</p>
          </Modal>
        )}
      </div>
    </main>
  );
}

export default Profile;
