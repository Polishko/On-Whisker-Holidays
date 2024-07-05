import styles from "./Message.module.css";
// import PropTypes from "prop-types";

function Message({ message, background }) {
  const textColorClass =
    background === "dark" ? styles.lightFont : styles.darkFont;

  return (
    <p className={`${styles.message} ${textColorClass}`}>
      <span role="img" aria-label="wave">
        👋
      </span>{" "}
      {message}
    </p>
  );
}

// Message.propTypes = {
//   message: PropTypes.node.isRequired,
//   background: PropTypes.oneOf(["light", "dark"]),
// };

// Message.defaultProps = {
//   background: "light",
// };

export default Message;
