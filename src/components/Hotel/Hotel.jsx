import styles from "./Hotel.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useHotels } from "../contexts/HotelsContext";
import { useEffect, useState } from "react";
import Spinner from "../Common/Spinner";
import EmojiRenderer from "../FlagRenderer";
import Facilities from "../Common/Facilities";
import Message from "../Common/Message";
import Button from "../Common/Button";
import Modal from "../Common/Modal";
import { useAuth } from "../contexts/AuthContext";
import { useComments } from "../contexts/CommentsContext";
import { useKey } from "../../hooks/useKey";

function Hotel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getHotel, currentHotel, isLoading } = useHotels();
  const { isAuthenticated } = useAuth();
  const { createComment } = useComments();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [charCount, setCharCount] = useState(0);

  useEffect(
    function () {
      if (id) getHotel(id);
    },
    [id, getHotel]
  );

  useEffect(() => {
    return () => {
      setIsModalOpen(false);
    };
  }, [navigate]);

  const {
    hotelName,
    city,
    detail,
    img,
    web,
    countryCode: emoji,
  } = currentHotel;

  function handleAddComment() {
    setIsModalOpen(true);
  }

  function handleCommentChange(e) {
    const value = e.target.value;
    if (value.length <= 80) {
      setComment(value);
      setCharCount(value.length);
    }
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();
    try {
      await createComment(comment, id);
      handleCloseModal();
    } catch (error) {
      // console.error(error);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setComment("");
    setCharCount(0);
  }

  useKey("Escape", handleCloseModal);

  if (isLoading) return <Spinner />;

  if (currentHotel.hotelName === "")
    return (
      <div className={styles.details}>
        <Message
          message={"Click to a hotel to find out more!"}
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
        <div className={styles.aveRating}>ave rating</div>
        <div className={styles.rate}>rate</div>
      </section>

      <section className={styles.right}>
        <h3 className={styles.hotelTitle}>
          <p className={styles.hotelName}>{hotelName}</p>
          <span className={styles.temperature}>temp</span>
        </h3>

        <div className={styles.location}>
          <p className={styles.city}>📍 {city}</p>
          <span>
            <EmojiRenderer emoji={emoji} />
          </span>
        </div>

        <div className={styles.detail}>
          <p>{detail}</p>
        </div>

        <div className={styles.moreInfo}>
          <p>
            <strong>Website:</strong> {web}
          </p>
          <div className={styles.bottom}>
            <Facilities hotel={currentHotel} />
            {isAuthenticated && (
              <Button
                className={styles.addComment}
                type="primary"
                onClick={handleAddComment}
              >
                Add comment
              </Button>
            )}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className={styles.modalContent}>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              maxLength="80"
              placeholder="Write your comment here..."
            />
            <p className={styles.charCount}>{charCount}/80 characters</p>
            <Button type="primary" onClick={handleCommentSubmit}>
              Submit
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Hotel;
