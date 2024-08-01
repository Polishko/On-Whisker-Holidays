import styles from "./PasswordModal.module.css";
import Button from "../common/Button";

function PasswordModal({
  handlePasswordSubmit,
  handleSaveChanges,
  password,
  closePasswordModal,
}) {
  return (
    <div className={styles.passwordModalContent}>
      <h3>Enter Password</h3>
      <input
        type="password"
        value={password}
        onChange={handlePasswordSubmit}
        placeholder="Password"
        autoComplete="new-password"
        className={styles.passwordInput}
        name={`modal-password_${Math.random().toString(36).substring(2)}`}
      />
      <div className={styles.buttons}>
        <Button onClick={handleSaveChanges} type="quaternary">
          Submit
        </Button>
        <Button onClick={closePasswordModal} type="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default PasswordModal;
