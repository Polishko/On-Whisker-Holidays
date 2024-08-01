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
import Modal from "../modal/Modal";
import { useModal } from "../../hooks/useModal";

function CommentItem({ comment, userName }) {
  const time = new Date(comment.timestamp);
  const { user, validatePassword, isAuthenticated } = useAuth();
  const checkAuth = useCheckAuth();
  const { deleteComment, editComment, fetchComments } = useComments();

  const [editedComment, setEditedComment] = useState(comment.text);
  const [charCount, setCharCount] = useState(comment.text.length);
  const [password, setPassword] = useState("");
  const [modalType, setModalType] = useState("");

  const navigate = useNavigate();

  const { isModalOpen, modalMessage, openModal, closeModal } = useModal();

  function handleEditClick() {
    if (!checkAuth()) return;
    setModalType("comment");
    openModal();
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
      closeModal();
      if (result.success) {
        setModalType("message");
        openModal("Comment deleted successfully.");
        await fetchComments();
      } else {
        setModalType("message");
        openModal(result.message);
      }
    } catch (error) {
      closeModal();
      setModalType("message");
      openModal("Failed to delete comment.");
    }
  }

  function handleCommentSubmit() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (comment.text === editedComment) {
      setModalType("message");
      openModal("Make changes to edit the old comment.");
      return;
    }
    setModalType("password");
    openModal();
  }

  function handlePasswordSubmit(e) {
    setPassword(e.target.value);
  }

  async function handleSaveChanges() {
    try {
      if (!password) {
        setModalType("message");
        openModal("Password field can't be empty");
        return;
      }

      const credentials = { email: user.email, password: password };
      const { success, message } = await validatePassword(credentials);

      if (!success) {
        setModalType("message");
        openModal(message);
        return;
      }

      const currentDate = new Date();
      const newTimestamp = currentDate.toISOString();

      const updatedComment = {
        ...comment,
        text: editedComment,
        timestamp: newTimestamp,
      };
      const result = await editComment(updatedComment);
      closeModal();
      if (result.success) {
        setModalType("message");
        openModal("Comment updated successfully!");
        await fetchComments();
      } else {
        setModalType("message");
        openModal(result.message);
      }

      setPassword("");
    } catch (currentError) {
      closeModal();
      setModalType("message");
      openModal("There was an error updating the comment.");
    }
  }

  // Modal open close with key actions
  useKey("Escape", () => {
    if (isModalOpen) closeModal();
  });

  useKey("Enter", () => {
    if (modalType === "comment") handleCommentSubmit();
    if (modalType === "password") handleSaveChanges();
    if (modalType === "delete") handleDelete();
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
              onClick={() => {
                setModalType("delete");
                openModal();
              }}
            >
              <i className={`fa-solid fa-trash-can ${styles.icon}`}></i>
              <span className={styles.tooltipText}>Delete comment</span>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          showCloseButton={modalType === "message" ? true : false}
        >
          {modalType === "comment" ? (
            <CommentModal
              handleCloseModal={closeModal}
              handleCharChange={handleCharChange}
              handleCommentSubmit={handleCommentSubmit}
              comment={editedComment}
              charCount={charCount}
            />
          ) : modalType === "password" ? (
            <PasswordModal
              closePasswordModal={closeModal}
              handlePasswordSubmit={handlePasswordSubmit}
              handleSaveChanges={handleSaveChanges}
              password={password}
            />
          ) : modalType === "delete" ? (
            <DeleteModal
              closeDeleteModal={closeModal}
              handleDelete={handleDelete}
            />
          ) : (
            <p>{modalMessage}</p>
          )}
        </Modal>
      )}
    </div>
  );
}

export default CommentItem;
