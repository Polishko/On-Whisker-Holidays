// import Button from "./Button";
// import styles from "./Modal.module.css";

// function Modal({ children, onClose }) {
//   return (
//     <div className={styles.modal}>
//       <div className={styles.modalContent}>
//         <Button onClick={onClose} type="secondary" className={styles.modalButton}>
//           &times;
//         </Button>
//         {children}
//       </div>
//     </div>
//   );
// }

// export default Modal;

import ReactDOM from "react-dom";
import Button from "./Button";
import styles from "./Modal.module.css";

function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <Button
          onClick={onClose}
          type="secondary"
          className={styles.modalButton}
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
