import styles from "./AvatarSelection.module.css";

function AvatarSelection({ avatars, selectedAvatar, handleAvatarChange }) {
  return (
    <div>
      <div className={styles.avatarList}>
        {avatars.map((avatar) => (
          <label key={avatar.id}>
            <img src={avatar.src} alt={avatar.id} />
            <input
              type="radio"
              name="avatar"
              value={avatar.id}
              checked={selectedAvatar === avatar.id}
              onChange={handleAvatarChange}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default AvatarSelection;