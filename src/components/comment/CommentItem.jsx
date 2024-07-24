import styles from "./CommentItem.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useComments } from "../contexts/CommentsContext";
import { useState } from "react";
import DeleteModal from "../modal/DeleteModal";
import { useKey } from "../../hooks/useKey";
import PasswordModal from "../modal/PasswordModal";
import { useUsers } from "../contexts/UsersContext";
import CommentModal from "../modal/CommentModal";

function CommentItem({ comment, userName }) {
  const time = new Date(comment.timestamp);
  const { user } = useAuth();
  const { validatePassword } = useUsers();
  const { deleteComment, editComment, fetchComments } = useComments();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [charCount, setCharCount] = useState(0);

  function openDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function handleEditClick() {
    setEditedComment(comment.text);
    setCharCount(comment.text.length);
    setIsCommentModalOpen(true);
  }

  function closeCommentModal() {
    setIsCommentModalOpen(false);
  }

  function closePasswordModal() {
    setPassword("");
    setIsPasswordModalOpen(false);
  }

  function handlePasswordSubmit(e) {
    setPassword(e.target.value);
  }

  function passwordFieldReset() {
    setPassword("");
  }

  function handleCharChange(e) {
    const value = e.target.value;
    if (value.length <= 80) {
      setEditedComment(value);
      setCharCount(value.length);
    }
  }

  async function handleDelete() {
    try {
      await deleteComment(comment.id);
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  }

  function handleCommentSubmit() {
    setIsPasswordModalOpen(true);
  }

  async function handleSaveChanges() {
    try {
      const credentials = { email: user.email, password: password };
      const { isValid, message } = await validatePassword(credentials);

      if (!password) {
        passwordFieldReset();
        alert("Password field can't be empty");
        return;
      }

      if (!isValid) {
        passwordFieldReset();
        alert(message);
        return;
      }

      const currentDate = new Date();
      const newTimestamp = currentDate.toISOString();

      const updatedComment = {
        ...comment,
        text: editedComment,
        timestamp: newTimestamp,
        password,
      };
      const result = await editComment(updatedComment);

      console.log("Edit Comment Result:", result);

      if (result.success) {
        alert("Comment updated successfully!");
        setIsPasswordModalOpen(false);
        closeCommentModal();
        await fetchComments(); // Fetch comments after updating the comment
      } else {
        alert(result.message);
      }

      passwordFieldReset("");
    } catch (currentError) {
      console.error("Unexpected Error in handleSaveChanges:", currentError);
      alert("There was an error updating the comment.");
    }
  }

  // Modal open close with key actions
  useKey("Escape", () => {
    if (isDeleteModalOpen) closeDeleteModal();
    if (isCommentModalOpen) closeCommentModal();
    if (isPasswordModalOpen) closePasswordModal();
  });

  useKey("Enter", () => {
    if (isDeleteModalOpen) handleDelete();
    if (isPasswordModalOpen) handleSaveChanges();
    if (isCommentModalOpen) handleCommentSubmit();
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
              onClick={handleEditClick}
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

      {isCommentModalOpen && (
        <CommentModal
          handleCloseModal={closeCommentModal}
          handleCharChange={handleCharChange}
          handleCommentSubmit={handleCommentSubmit}
          comment={editedComment}
          charCount={charCount}
        />
      )}

      {isPasswordModalOpen && (
        <PasswordModal
          closePasswordModal={closePasswordModal}
          handlePasswordSubmit={handlePasswordSubmit}
          handleSaveChanges={handleSaveChanges}
          password={password}
        />
      )}
    </div>
  );
}

export default CommentItem;
