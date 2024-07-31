import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CommentItem.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useComments } from "../contexts/CommentsContext";
import { useKey } from "../../hooks/useKey";
import { useCheckAuth } from "../../hooks/useCheckTokenValidity";

import DeleteModal from "../modal/DeleteModal";
import PasswordModal from "../modal/PasswordModal";
import CommentModal from "../modal/CommentModal";

function CommentItem({ comment, userName }) {
  const time = new Date(comment.timestamp);
  const { user, validatePassword, isAuthenticated } = useAuth();
  const checkAuth = useCheckAuth();
  const { deleteComment, editComment, fetchComments } = useComments();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [editedComment, setEditedComment] = useState(comment.text);
  const [charCount, setCharCount] = useState(comment.text.length);

  const navigate = useNavigate();

  function openDeleteModal() {
    if (!checkAuth()) return;
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  function handleEditClick() {
    if (!checkAuth()) return;
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
    if (!checkAuth()) return;
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
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      const result = await deleteComment(comment.id);
      if (result.success) {
        alert("Comment deleted successfully");
        await fetchComments();
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Failed to delete comment.");
    }
  }

  function handleCommentSubmit() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (comment.text === editedComment) {
      alert("Make changes to edit the old comment.");
      return;
    }
    setIsPasswordModalOpen(true);
  }

  async function handleSaveChanges() {
    try {
      const credentials = { email: user.email, password: password };
      const { success, message } = await validatePassword(credentials);

      if (!password) {
        passwordFieldReset();
        alert("Password field can't be empty");
        return;
      }

      if (!success) {
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

      if (result.success) {
        alert("Comment updated successfully!");
        setIsPasswordModalOpen(false);
        closeCommentModal();
        await fetchComments();
      } else {
        alert(result.message);
      }

      passwordFieldReset("");
    } catch (currentError) {
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
