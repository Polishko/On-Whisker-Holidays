import styles from "./Modal.module.css";

function Modal({ message, onClose }) {
  if (!message) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <p className={styles.close} onClick={onClose}>
          Back
        </p>
      </div>
    </div>
  );
}

export default Modal;
