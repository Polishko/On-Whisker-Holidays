import { useParams } from "react-router-dom";
import { useHotels } from "../contexts/HotelsContext";
import styles from "./Hotel.module.css";
import { useEffect } from "react";
import Spinner from "../Common/Spinner";
import Message from "../Common/Message";
import EmojiRenderer from "../FlagRenderer";
import Facilities from "../Common/Facilities";

function Hotel() {
  const { id } = useParams();
  const { getHotel, currentHotel, isLoading } = useHotels();

  useEffect(
    function () {
      if (id) getHotel(id);
    },
    [id]
  );

  const {
    hotelName,
    city,
    detail,
    img,
    web,
    countryCode: emoji,
  } = currentHotel;

  if (!id)
    return (
      <Message
        message={"Click to a hotel to find out more!"}
        background={"light"}
      />
    );

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.hotelCard}>
      <section className={styles.left}>
        <div className={styles.imageContainer}>
          <img src={`../../sunanini/${img}`} alt="Hotel" />
        </div>
        <div className={styles.aveRating}>ave rating</div>
        <div className={styles.rate}>rate</div>
      </section>

      <section className={styles.right}>
        <h3 className={styles.hotelTitle}>
          <p className={styles.hotelName}>{hotelName}</p>
          <span className={styles.temperature}>Current temp</span>
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
          <Facilities hotel={currentHotel} />
        </div>
      </section>
    </div>
  );
}

export default Hotel;
