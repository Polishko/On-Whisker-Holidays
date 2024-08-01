import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./Hotel.module.css";

import { useAuth } from "../contexts/AuthContext";
import { useComments } from "../contexts/CommentsContext";
import { useHotels } from "../contexts/HotelsContext";
import { useCheckAuth } from "../../hooks/useCheckTokenValidity";
import { useKey } from "../../hooks/useKey";
import { useModal } from "../../hooks/useModal";

import Spinner from "../common/Spinner";
import EmojiRenderer from "../common/EmojiRenderer";
import Facilities from "../common/Facilities";
import Message from "../common/Message";
import Button from "../common/Button";
import Weather from "../common/Weather";
import CommentModal from "../modal/CommentModal";
import Modal from "../modal/Modal";
import StarRating from "../common/StarRating";

function Hotel() {
  const { id } = useParams();
  const { getHotel, currentHotel, isLoading } = useHotels();
  const { isAuthenticated } = useAuth();
  const { createComment, fetchComments } = useComments();
  const checkAuth = useCheckAuth();

  const { isModalOpen, modalMessage, openModal, closeModal } = useModal();

  const [comment, setComment] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [modalType, setModalType] = useState("");

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

  function handleAddComment() {
    if (!checkAuth()) return;
    setModalType("comment");
    openModal();
  }

  function handleCharChange(e) {
    const value = e.target.value;
    if (value.length <= 80) {
      setComment(value);
      setCharCount(value.length);
    }
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) {
      setModalType("message");
      openModal("Please add a comment to submit!");
      return;
    }
    try {
      const result = await createComment(comment, id);
      if (result.success) {
        setModalType("message");
        openModal("Comment added successfully.");
        await fetchComments();
      } else {
        setModalType("message");
        openModal(result.message);
      }
    } catch (error) {
      setModalType("message");
      openModal("There was an error adding the comment.");
    }
  }

  function handleCloseModal() {
    closeModal();
    setComment("");
    setCharCount(0);
    setModalType("");
  }

  useKey("Escape", (e) => {
    if (isModalOpen) {
      handleCloseModal(e);
    }
  });

  useKey("Enter", (e) => {
    if (isModalOpen && modalType === "comment") {
      if (comment.trim()) {
        handleCommentSubmit(e);
      } else {
        setModalType("message");
        openModal("Please add a comment to submit!");
      }
    } else if (isModalOpen) {
      handleCloseModal();
    }
  });

  if (isLoading) return <Spinner />;

  if (currentHotel.hotelName === "")
    return (
      <div className={styles.details}>
        <Message
          message={"Click a hotel to find out more!"}
          background={"light"}
        />
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

        <div className={styles.ratingContainer}>
          <div className={styles.rateHotel}>
            {
              <>
                <StarRating
                  maxRating={5}
                  size={24}
                  // onSetRating={setUserRating}
                />
                {/* {userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to list
                  </button>
                )} */}
              </>
              // ) : (
              //   <p>
              //     You rated this movie {watchedUserRating} <span>⭐</span>
              //   </p>
            }
          </div>
          <div className={styles.aveRating}>ave rating</div>
        </div>

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
                onClick={handleAddComment}
              >
                Add comment
              </Button>
            )}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          showCloseButton={modalType === "message"}
        >
          {modalType === "message" ? (
            <p>{modalMessage}</p>
          ) : (
            <CommentModal
              handleCloseModal={handleCloseModal}
              handleCharChange={handleCharChange}
              handleCommentSubmit={handleCommentSubmit}
              comment={comment}
              charCount={charCount}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default Hotel;
