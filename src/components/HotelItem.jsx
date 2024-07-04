import { Link } from "react-router-dom";
import styles from "./HotelItem.module.css";
import { useHotels } from "./contexts/HotelsContext";
import EmojiRenderer from "./EmojiRenderer";
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
      />
      <h3 className={styles.name}>{hotelName}</h3>
      <span>
        {city}, {country}{" "}
      </span>
      <span className={styles.emoji}>
        <EmojiRenderer emoji={emoji} />
      </span>
      <SpecificsEmojis specifics={type} />
    </li>
  );
}

export default HotelItem;
