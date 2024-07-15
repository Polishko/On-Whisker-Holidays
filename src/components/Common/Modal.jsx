import ReactDOM from "react-dom";
import Button from "./Button";
import styles from "./Modal.module.css";

function Modal({ children, onClose, customClass }) {
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <Button
          onClick={onClose}
          type="secondary"
          className={`${styles.modalButton} ${
            customClass ? styles[customClass] : ""
          }`}
        >
          &times;
        </Button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
