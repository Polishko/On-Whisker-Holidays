import styles from "./Message.module.css";

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

export default Message;

