import styles from "./CommentItem.module.css";
import { useAuth } from "../contexts/AuthContext";

function CommentItem({ comment, userName }) {
  const time = new Date(comment.timestamp);
  const { user } = useAuth();
  return (
    <div
      className={`${styles.commentItem} ${
        comment.userId === user.id ? styles.userComments : styles.otherUsers
      }`}
    >
      <div className={styles.top}>
        <p className={styles.user}>{userName}</p>
        <p className={styles.time}>{time.toLocaleDateString()}</p>
      </div>

      <div className={styles.bottom}>
        <p className={styles.text}>{comment.text}</p>
        <p className={styles.trash}>
          <i className="fa-solid fa-trash-can"></i>
        </p>
      </div>
    </div>
  );
}

export default CommentItem;
