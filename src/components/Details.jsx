import styles from "./Details.module.css";
import Message from "./Message";

function Details() {
  return (
    <div className={styles.details}>
      <p>X hotels found</p>
      <Message
        message={"Click to an hotel to find out more!"}
        background={"light"}
      />
    </div>
  );
}

export default Details;
