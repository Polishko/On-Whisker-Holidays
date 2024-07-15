import styles from "./CommentItem.module.css";

function CommentItem({ comment, user }) {
  const time = new Date(comment.timestamp);
  return (
    <div className={styles.commentItem}>
      <div className={styles.top}>
        <p className={styles.user}>{user.name}</p>

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
