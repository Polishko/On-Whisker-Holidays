import { useState } from "react";
import styles from "./CommentItem.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useComments } from "../contexts/CommentsContext";
import { useKey } from "../../hooks/useKey";
import { useAuthenticatedAction } from "../../hooks/useAuthenticatedAction";

import DeleteModal from "../modal/DeleteModal";
import PasswordModal from "../modal/PasswordModal";
import CommentModal from "../modal/CommentModal";
import Modal from "../modal/Modal";
import { useModal } from "../../hooks/useModal";

function CommentItem({ comment, userName }) {
  const time = new Date(comment.timestamp);

  const { user, validatePassword } = useAuth();
  const { deleteComment, editComment, fetchComments } = useComments();

  const executeAuthenticatedAction = useAuthenticatedAction();

  const [editedComment, setEditedComment] = useState(comment.text);
  const [charCount, setCharCount] = useState(comment.text.length);
  const [password, setPassword] = useState("");

  const commentModal = useModal();
  const messageModal = useModal();
  const passwordModal = useModal();
  const deleteModal = useModal();

  function handleEditClick() {
    executeAuthenticatedAction(() => {
      setEditedComment(comment.text);
      setCharCount(comment.text.length);
      commentModal.openModal();
    });
  }

  function handleDeleteClick() {
    executeAuthenticatedAction(() => {
      deleteModal.openModal();
    });
  }

  function handleCharChange(e) {
    const value = e.target.value;
    if (value.length <= 80) {
      setEditedComment(value);
      setCharCount(value.length);
    }
  }

  function handleDelete() {
    executeAuthenticatedAction(async () => {
      try {
        const result = await deleteComment(comment.id);
        if (result.success) {
          messageModal.openModal("Comment deleted successfully.");
          await fetchComments();
        } else {
          messageModal.openModal(result.message);
        }
      } catch (error) {
        messageModal.openModal("Failed to delete comment.");
      }
    });
  }

  function handleCommentSubmit() {
    executeAuthenticatedAction(() => {
      if (comment.text === editedComment.trim()) {
        messageModal.openModal("Make changes to edit the old comment.");
        return;
      } else if (editedComment.trim() === "") {
        messageModal.openModal("Comment can't be empty.");
        return;
      }
      passwordModal.openModal();
    });
  }

  function handlePasswordSubmit(e) {
    executeAuthenticatedAction(() => {
      setPassword(e.target.value);
    });
  }

  function handleSaveChanges() {
    executeAuthenticatedAction(async () => {
      try {
        if (!password) {
          messageModal.openModal("Password field can't be empty!");
          setPassword("");
          return;
        }

        const credentials = { email: user.email, password: password };
        const { success } = await validatePassword(credentials);

        if (!success) {
          messageModal.openModal("Wrong password! Please try again.");
          setPassword("");
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

        if (result.success) {
          messageModal.openModal("Comment updated successfully!");
          await fetchComments();
          passwordModal.closeModal();
        } else {
          messageModal.openModal(result.message);
        }
      } catch (currentError) {
        messageModal.openModal("There was an error updating the comment.");
      } finally {
        commentModal.closeModal();
        setPassword("");
      }
    });
  }

  function handleCloseModal() {
    if (messageModal.isModalOpen) {
      messageModal.closeModal();
    } else if (passwordModal.isModalOpen) {
      passwordModal.closeModal();
      setPassword("");
    } else if (deleteModal.isModalOpen) {
      deleteModal.closeModal();
    } else if (commentModal.isModalOpen) {
      commentModal.closeModal();
    }
  }

  // key press actions
  useKey("Escape", (e) => {
    if (
      commentModal.isModalOpen ||
      messageModal.isModalOpen ||
      deleteModal.isModalOpen ||
      passwordModal.isModalOpen
    ) {
      handleCloseModal(e);
      setPassword("");
    }
  });

  useKey("Enter", () => {
    if (messageModal.isModalOpen) {
      messageModal.closeModal();
    } else if (passwordModal.isModalOpen) {
      handleSaveChanges();
    } else if (commentModal.isModalOpen) {
      handleCommentSubmit();
    } else if (deleteModal.isModalOpen) {
      handleDelete();
    }
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
              onClick={handleDeleteClick}
            >
              <i className={`fa-solid fa-trash-can ${styles.icon}`}></i>
              <span className={styles.tooltipText}>Delete comment</span>
            </div>
          </div>
        )}
      </div>

      {commentModal.isModalOpen && (
        <Modal onClose={commentModal.closeModal}>
          <CommentModal
            handleCloseModal={handleCloseModal}
            handleCharChange={handleCharChange}
            handleCommentSubmit={handleCommentSubmit}
            comment={editedComment}
            charCount={charCount}
          />
        </Modal>
      )}

      {passwordModal.isModalOpen && (
        <Modal onClose={passwordModal.closeModal}>
          <PasswordModal
            closePasswordModal={handleCloseModal}
            handlePasswordSubmit={handlePasswordSubmit}
            handleSaveChanges={handleSaveChanges}
            password={password}
          />
        </Modal>
      )}

      {deleteModal.isModalOpen && (
        <Modal onClose={deleteModal.closeModal}>
          <DeleteModal
            closeDeleteModal={handleCloseModal}
            handleDelete={handleDelete}
          />
        </Modal>
      )}

      {messageModal.isModalOpen && (
        <Modal onClose={messageModal.closeModal} showCloseButton={true}>
          <p>{messageModal.modalMessage}</p>
        </Modal>
      )}
    </div>
  );
}

export default CommentItem;
