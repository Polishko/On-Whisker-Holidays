import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./Hotel.module.css";

import { useAuth } from "../contexts/AuthContext";
import { useComments } from "../contexts/CommentsContext";
import { useHotels } from "../contexts/HotelsContext";
import { useKey } from "../../hooks/useKey";
import { useModal } from "../../hooks/useModal";
import { useAuthenticatedAction } from "../../hooks/useAuthenticatedAction";

import Spinner from "../common/Spinner";
import EmojiRenderer from "../common/EmojiRenderer";
import Facilities from "../common/Facilities";
import Message from "../common/Message";
import Button from "../common/Button";
import Weather from "../common/Weather";
import CommentModal from "../modal/CommentModal";
import Modal from "../modal/Modal";
import HotelRatings from "../ratings/HotelRatings";

function Hotel() {
  const { id } = useParams();
  const { getHotel, currentHotel, isLoading } = useHotels();
  const { isAuthenticated } = useAuth();
  const { createComment, fetchComments } = useComments();

  const executeAuthenticatedAction = useAuthenticatedAction();

  const commentModal = useModal();
  const messageModal = useModal();

  const [comment, setComment] = useState("");
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (id) getHotel(id);
  }, [id, getHotel]);

  const {
    hotelName,
    city,
    detail,
    img,
    web,
    countryCode: emoji,
    position: { lat: latitude, lng: longitude },
  } = currentHotel;

  function handleAddCommentClick() {
    executeAuthenticatedAction(() => {
      commentModal.openModal();
    });
  }

  // typing in CommentModal
  function handleCharChange(e) {
    const value = e.target.value;
    if (value.length <= 80) {
      setComment(value);
      setCharCount(value.length);
    }
  }

  // submitting in CommentModal
  function handleCommentSubmit(e) {
    e.preventDefault();

    if (!comment.trim()) {
      messageModal.openModal("Please add a comment to submit!");
      return;
    }

    executeAuthenticatedAction(async () => {
      try {
        const result = await createComment(comment, id);
        if (result.success) {
          messageModal.openModal("Comment added successfully.");
          await fetchComments();
          commentModal.closeModal();
        } else {
          messageModal.openModal(result.message);
        }
      } catch (error) {
        messageModal.openModal("There was an error adding the comment.");
      }
    });
  }

  function handleCloseModal() {
    if (messageModal.isModalOpen) {
      messageModal.closeModal();
    } else if (commentModal.isModalOpen) {
      commentModal.closeModal();
    }
    setComment("");
    setCharCount(0);
  }

  // key press actions
  useKey("Escape", (e) => {
    if (commentModal.isModalOpen || messageModal.isModalOpen) {
      handleCloseModal(e);
    }
  });

  useKey("Enter", (e) => {
    if (messageModal.isModalOpen) {
      handleCloseModal();
    } else if (commentModal.isModalOpen) {
      handleCommentSubmit(e);
    }
  });

  if (isLoading) return <Spinner />;

  if (currentHotel.hotelName === "")
    return (
      <div className={styles.clickHotelInvitation}>
        <Message
          message={"Click a hotel to find out more!"}
          background={"light"}
        />
        <div className={styles.placeholderImage}>
          <img src="../../vacation-placeholder.jpg" alt="vacation" />
        </div>
      </div>
    );

  return (
    <div className={styles.hotelCard}>
      <section className={styles.left}>
        <div className={styles.imageContainer}>
          <img src={`../../${img}`} alt="hotel" />
        </div>
      </section>

      <section className={styles.right}>
        <h3 className={styles.hotelTitle}>
          <p className={styles.hotelName}>{hotelName}</p>
        </h3>

        <div className={styles.location}>
          <p className={styles.city}>📍 {city}</p>
          <span>
            <EmojiRenderer emoji={emoji} />
          </span>
          <div className={styles.weather}>
            <Weather latitude={latitude} longitude={longitude} />
          </div>
        </div>

        <HotelRatings hotelId={id} />

        <div className={styles.detail}>
          <p>{detail}</p>
        </div>

        <div className={styles.moreInfo}>
          <p className={styles.webAddress}>
            <strong>Website:</strong>{" "}
            <a href={web} target="_blank" rel="noopener noreferrer">
              {web}
            </a>
          </p>
          <div className={styles.bottom}>
            <Facilities hotel={currentHotel} />
            {isAuthenticated && (
              <Button
                className={styles.addComment}
                type="quaternary"
                onClick={handleAddCommentClick}
              >
                Add comment
              </Button>
            )}
          </div>
        </div>
      </section>

      {commentModal.isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <CommentModal
            handleCloseModal={handleCloseModal}
            handleCharChange={handleCharChange}
            handleCommentSubmit={handleCommentSubmit}
            comment={comment}
            charCount={charCount}
          />
        </Modal>
      )}

      {messageModal.isModalOpen && (
        <Modal onClose={handleCloseModal} showCloseButton={true}>
          <p>{messageModal.modalMessage}</p>
        </Modal>
      )}
    </div>
  );
}

export default Hotel;
