import styles from "./Button.module.css";
import PropTypes from "prop-types";

function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

// Button.propTypes = {
//   children: PropTypes.node.isRequired,
//   onClick: PropTypes.func.isRequired,
//   type: PropTypes.oneOf(["primary", "back", "position", "navigate", "close"])
//     .isRequired,
// };

export default Button;
