import styles from "./Hotel.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useHotels } from "../contexts/HotelsContext";
import { useEffect, useState } from "react";
import Spinner from "../common/Spinner";
import EmojiRenderer from "../common/EmojiRenderer";
import Facilities from "../common/Facilities";
import Message from "../common/Message";
import Button from "../common/Button";
import { useAuth } from "../contexts/AuthContext";
import { useComments } from "../contexts/CommentsContext";
import { useKey } from "../../hooks/useKey";
import Weather from "../common/Weather";
import CommentModal from "../modal/CommentModal";

function Hotel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getHotel, currentHotel, isLoading } = useHotels();
  const { isAuthenticated } = useAuth();
  const { createComment, fetchComments } = useComments();
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
    position: { lat: latitude, lng: longitude },
  } = currentHotel;

  function handleAddComment() {
    setIsModalOpen(true);
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
    try {
      const result = await createComment(comment, id);
      if (result.success) {
        handleCloseModal();
        fetchComments();
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
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

        <div>
          <div className={styles.aveRating}>ave rating</div>
          <div className={styles.rate}>rate</div>
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
        <CommentModal
          handleCloseModal={handleCloseModal}
          handleCharChange={handleCharChange}
          handleCommentSubmit={handleCommentSubmit}
          comment={comment}
          charCount={charCount}
        />
      )}
    </div>
  );
}

export default Hotel;
