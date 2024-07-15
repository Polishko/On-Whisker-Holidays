import styles from "./Profile.module.css";
import { useAuth } from "../components/contexts/AuthContext";
import { useState } from "react";
import Button from "../components/Common/Button";
import AvatarSelection from "../components/Common/AvatarSelection";

function Profile() {
  const { user, logout, deleteUser } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);

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

  const handleDeleteAccount = () => {
    deleteUser(user.id);
  };

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
        <Button onClick={handleDeleteAccount} type="secondary">
          Delete Account
        </Button>
        <Button onClick={logout} type="primary">
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Profile;
