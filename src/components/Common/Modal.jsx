// import styles from "./Modal.module.css";

// function Modal({ children, onClose }) {
//   return (
//     <div className={styles.modal}>
//       <div className={styles.modalContent}>
//         <div className={styles.close} onClick={onClose}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Modal;

import styles from "./Modal.module.css";

function Modal({ children, onClose }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
