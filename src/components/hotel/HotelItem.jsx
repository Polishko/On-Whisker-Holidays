import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";

import styles from "./HotelItem.module.css";

import { useHotels } from "../contexts/HotelsContext";

import EmojiRenderer from "../common/EmojiRenderer";
import SpecificsEmojis from "../common/SpecificsEmojis";

function HotelItem({ hotel, currentQuery }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { currentHotel } = useHotels();
  const itemRef = useRef(null);

  const {
    id,
    hotelName,
    country,
    countryCode: emoji,
    city,
    type,
    position,
  } = hotel;

  const handleClickItem = () => {
    const itemPosition = itemRef.current.getBoundingClientRect();
    localStorage.setItem("lastClickedPosition", JSON.stringify(itemPosition)); // Store position in localStorage
  };

  // maintain filter state when navigating between hotel items
  useEffect(() => {
    if (currentQuery !== searchParams.get("query") && currentQuery) {
      setSearchParams({ query: currentQuery });
    }
  }, [currentQuery, searchParams, setSearchParams]);

  return (
    <li style={{ cursor: "pointer" }} onClick={handleClickItem} ref={itemRef}>
      <Link
        className={`${styles.hotelItem} ${
          id === currentHotel.id ? styles["hotelItem--active"] : ""
        }`}
        to={`hotels/${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <div className={styles.leftContainer}>
          <h3 className={styles.name}>{hotelName}</h3>
          <SpecificsEmojis specifics={type} />
        </div>

        <div className={styles.rightContainer}>
          <span>
            {city}, {country}
          </span>
          <span className={styles.emoji}>
            <EmojiRenderer emoji={emoji} />
          </span>
        </div>
      </Link>
    </li>
  );
}

export default HotelItem;
