import styles from "./CommentsList.module.css";
function CommentsList() {
  return (
    <div className={styles.commentList}>
      <div className={styles.commentsInner}>Here will come user comments</div>
    </div>
  );
}

export default CommentsList;
