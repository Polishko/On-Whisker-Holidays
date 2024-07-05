import styles from "./Details.module.css";
import Message from "./Message";

function Details() {
  return (
    <div className={styles.details}>
      <Message
        message={"Click to a hotel to find out more!"}
        background={"light"}
      />
    </div>
  );
}

export default Details;
