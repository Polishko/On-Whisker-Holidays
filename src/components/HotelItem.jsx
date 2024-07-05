import { Link } from "react-router-dom";
import styles from "./HotelItem.module.css";
import { useHotels } from "./contexts/HotelsContext";
import EmojiRenderer from "./FlagRenderer";
import SpecificsEmojis from "./SpecificsEmojis";

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
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <div className={styles.leftContainer}>
          <h3 className={styles.name}>{hotelName}</h3>
          <span className={styles.emoji}>
            <EmojiRenderer emoji={emoji} />
          </span>
        </div>

        <div className={styles.rightContainer}>
          <span>
            {city}, {country}
          </span>

          <SpecificsEmojis specifics={type} />
        </div>
      </Link>
    </li>
  );
}

export default HotelItem;
