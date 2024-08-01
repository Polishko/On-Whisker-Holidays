import Button from "../common/Button";
import styles from "./DeleteModal.module.css";

function DeleteModal({ closeDeleteModal, handleDelete }) {
  return (
    <div>
      <h3>Are you sure you want to delete this comment?</h3>
      <div className={styles.buttons}>
        <Button onClick={handleDelete} type="quaternary">
          Yes
        </Button>
        <Button onClick={closeDeleteModal} type="secondary">
          No
        </Button>
      </div>
    </div>
  );
}

export default DeleteModal;
