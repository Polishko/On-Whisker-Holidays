import styles from "./CommentItem.module.css";

function CommentItem({ comment, user }) {
  console.log(user.name);
  return (
    <div className={styles.commentItem}>
      <p>{user.name}</p>
      <p>{comment.text}</p>
    </div>
  );
}

export default CommentItem;
