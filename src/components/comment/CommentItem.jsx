import styles from "./CommentItem.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useComments } from "../contexts/CommentsContext";

function CommentItem({ comment, userName }) {
  const time = new Date(comment.timestamp);
  const { user } = useAuth();
  const { deleteComment } = useComments();

  async function handleDelete() {
    try {
      await deleteComment(comment.id);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  }

  return (
    <div
      className={`${styles.commentItem} ${
        user && comment.userId === user.id
          ? styles.userComments
          : styles.otherUsers
      }`}
    >
      <div className={styles.top}>
        <p className={styles.user}>{userName}</p>
        <p className={styles.time}>{time.toLocaleDateString()}</p>
      </div>

      <div className={styles.bottom}>
        <p className={styles.text}>{comment.text}</p>
        {user && comment.userId === user.id && (
          <p className={styles.trash} onClick={handleDelete}>
            <i className="fa-solid fa-trash-can"></i>
          </p>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
