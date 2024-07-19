import styles from "./CommentItem.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useComments } from "../contexts/CommentsContext";
import { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { useKey } from "../../hooks/useKey";

function CommentItem({ comment, userName }) {
  const time = new Date(comment.timestamp);
  const { user } = useAuth();
  const { deleteComment } = useComments();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  async function handleDelete() {
    try {
      await deleteComment(comment.id);
      closeModal();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  }

  useKey("Escape", () => {
    if (isModalOpen) closeModal();
  });

  useKey("Enter", () => {
    if (isModalOpen) handleDelete();
  });

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
          <div className={styles.trash} onClick={openModal}>
            <div className={styles.iconContainer}>
              <i className={`fa-solid fa-trash-can ${styles.icon}`}></i>
              <span className={styles.tooltipText}>Delete comment</span>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          customClass="customModalButton"
          showCloseButton={false}
        >
          <div>
            <h3>Are you sure you want to delete this comment?</h3>
            <div className={styles.modalButtons}>
              <Button onClick={handleDelete} type="primary">
                Yes
              </Button>
              <Button onClick={closeModal} type="secondary">
                No
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CommentItem;
