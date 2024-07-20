import ReactDOM from "react-dom";
import Button from "./Button";
import styles from "./Modal.module.css";

function Modal({ children, onClose, customClass, showCloseButton = true }) {
  return ReactDOM.createPortal(
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          {showCloseButton && (
            <Button
              onClick={onClose}
              type="secondary"
              className={`${styles.modalButton} ${
                customClass ? styles[customClass] : ""
              }`}
            >
              &times;
            </Button>
          )}
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
}

export default Modal;
