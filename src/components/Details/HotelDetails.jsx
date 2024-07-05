import styles from "./HotelDetails.module.css";
import Message from "../Common/Message";

function HotelDetails() {
  return (
    <div className={styles.details}>
      <Message
        message={"Click to a hotel to find out more!"}
        background={"light"}
      />
    </div>
  );
}

export default HotelDetails;
