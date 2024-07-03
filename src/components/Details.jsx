import styles from "./Details.module.css";
import Message from "./Message";

function Details() {
  return (
    <div className={styles.details}>
      <Message message={"Click to an hotel to find out more!"} />
    </div>
  );
}

export default Details;
