import { Link } from "react-router-dom";
import styles from "./HotelItem.module.css";
import { useHotels } from "../contexts/HotelsContext";
import EmojiRenderer from "../common/EmojiRenderer";
import SpecificsEmojis from "../common/SpecificsEmojis";

function HotelItem({ hotel }) {
  const { currentHotel } = useHotels();
  const {
    id,
    hotelName,
    country,
    countryCode: emoji,
    city,
    type,
    position,
  } = hotel;

  return (
    <li>
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
