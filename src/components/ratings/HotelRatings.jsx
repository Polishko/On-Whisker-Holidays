import { Link, useNavigate } from "react-router-dom";

import styles from "./HotelRatings.module.css";

import { useRatings } from "../contexts/RatingsContext";
import { useAuth } from "../contexts/AuthContext";

import Spinner from "../common/Spinner";
import StarRating from "./StarRating";

function HotelRatings({ hotelId }) {
  const { user, isAuthenticated, checkTokenValidity } = useAuth();
  const {
    ratings,
    addRating,
    fetchRatings,
    isLoading: isRatingsLoading,
  } = useRatings();
  const navigate = useNavigate();

  const existingRating = isAuthenticated
    ? ratings.find(
        (rating) => rating.userId === user.id && rating.hotelId === hotelId
      )
    : null;

  const hotelRatings = ratings
    .filter((rating) => rating.hotelId === hotelId)
    .map((rating) => rating.rating);

  const averageRating =
    hotelRatings.length > 0
      ? hotelRatings.reduce((sum, rating) => sum + rating, 0) /
        hotelRatings.length
      : 0;

  async function setUserRating(rating) {
    checkTokenValidity();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (existingRating) {
      // alert("You have already rated this hotel.");
      return;
    }

    const newRating = {
      userId: user.id,
      hotelId: hotelId,
      rating,
    };

    const result = await addRating(newRating);

    if (result.success) {
      await fetchRatings();
    } else {
      console.error(result.message);
    }
  }

  if (isRatingsLoading) return <Spinner />;

  return (
    <div className={styles.ratingContainer}>
      <div className={styles.rate}>
        {isAuthenticated ? (
          existingRating ? (
            `Your rating: ${existingRating.rating}`
          ) : (
            <StarRating maxRating={5} size={24} onSetRating={setUserRating} />
          )
        ) : (
          <Link to="/register">Register to rate</Link>
        )}
      </div>

      {averageRating > 0 ? (
        <div className={styles.aveRating}>{`/ ${averageRating.toFixed(
          1
        )} average rating`}</div>
      ) : (
        <div className={styles.rateText}>
          &larr; Be the first one to rate this hotel!
        </div>
      )}
    </div>
  );
}

export default HotelRatings;
