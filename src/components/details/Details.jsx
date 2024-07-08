import styles from "./Details.module.css";

import Hotel from "../hotel/Hotel";
import CommentsList from "../comment/CommentsList";

function Details() {
  return (
    <div className={styles.details}>
      <Hotel />
      <CommentsList />
    </div>
  );
}

export default Details;
