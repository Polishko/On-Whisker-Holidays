import styles from "./AvatarSelection.module.css";

function AvatarSelection({ avatars, selectedAvatar, handleAvatarChange }) {
  return (
    <div>
      <div className={styles.avatarList}>
        {avatars.map((avatar) => (
          <label key={avatar.id} className={styles.avatarLabel}>
            <input
              type="radio"
              name="avatar"
              value={avatar.id}
              checked={selectedAvatar === avatar.id}
              onChange={handleAvatarChange}
              className={styles.avatarInput}
            />
            <img
              src={avatar.src}
              alt={avatar.id}
              className={`${styles.avatarImage} ${
                selectedAvatar === avatar.id ? styles.selected : ""
              }`}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default AvatarSelection;
