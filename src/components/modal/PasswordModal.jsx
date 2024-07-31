import Button from "../common/Button";
import Modal from "./Modal";

function PasswordModal({
  closePasswordModal,
  handlePasswordSubmit,
  handleSaveChanges,
  password,
}) {
  return (
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
        <div>
          <Button onClick={handleSaveChanges} type="quaternary">
            Submit
          </Button>
          <Button onClick={closePasswordModal} type="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default PasswordModal;
