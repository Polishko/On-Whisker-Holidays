import styles from "./CommentItem.module.css";

function CommentItem({ comment, user }) {
  const time = new Date(comment.timestamp);
  return (
    <div className={styles.commentItem}>
      <p className={styles.user}>{user.name}</p>
      <p className={styles.text}>{comment.text}</p>
      <p className={styles.time}>{time.toLocaleDateString()}</p>
      <p className={styles.trash}>
        <i className="fa-solid fa-trash-can"></i>
      </p>
    </div>
  );
}

export default CommentItem;
