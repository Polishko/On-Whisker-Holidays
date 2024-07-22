import styles from "./CommentItem.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useComments } from "../contexts/CommentsContext";
import { useState } from "react";
import DeleteModal from "../modal/DeleteModal";
import EditModal from "../modal/EditModal";

import { useKey } from "../../hooks/useKey";

function CommentItem({ comment, userName }) {
  const time = new Date(comment.timestamp);
  const { user } = useAuth();
  const { deleteComment } = useComments();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function openDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function openEditModal() {
    setIsEditModalOpen(true);
  }

  function closeEditModal() {
    setIsEditModalOpen(false);
  }

  async function handleDelete() {
    try {
      await deleteComment(comment.id);
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  }

  async function handleEdit() {
    return;
  }

  // Modal open close with key actions
  useKey("Escape", () => {
    if (isDeleteModalOpen) closeDeleteModal();
  });

  useKey("Enter", () => {
    if (isDeleteModalOpen) handleDelete();
  });

  useKey("Escape", () => {
    if (isEditModalOpen) closeEditModal();
  });

  useKey("Enter", () => {
    if (isEditModalOpen) handleEdit();
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
          <div className={styles.icons}>
            <div
              className={`${styles.edit} ${styles.iconContainer}`}
              onClick={openEditModal}
            >
              <i className={`fas fa-edit ${styles.icon}`}></i>
              <span className={styles.tooltipText}>Edit comment</span>
            </div>
            <div
              className={`${styles.trash} ${styles.iconContainer}`}
              onClick={openDeleteModal}
            >
              <i className={`fa-solid fa-trash-can ${styles.icon}`}></i>
              <span className={styles.tooltipText}>Delete comment</span>
            </div>
          </div>
        )}
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          closeDeleteModal={closeDeleteModal}
          handleDelete={handleDelete}
        />
      )}

      {isEditModalOpen && (
        <EditModal closeEditModal={closeEditModal} handleEdit={handleEdit} />
      )}
    </div>
  );
}

export default CommentItem;
