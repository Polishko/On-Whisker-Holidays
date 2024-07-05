import styles from "./HotelDetails.module.css";

import Hotel from "../hotel/Hotel";
import CommentsList from "./CommentsList";

function HotelDetails() {
  return (
    <div className={styles.details}>
      <Hotel />
      <CommentsList />
    </div>
  );
}

export default HotelDetails;
