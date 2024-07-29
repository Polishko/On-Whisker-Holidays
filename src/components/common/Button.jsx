import styles from "./Button.module.css";

function Button({ children, onClick, type, className }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type]} ${className ? className : ""}`}
    >
      {children}
    </button>
  );
}

export default Button;
