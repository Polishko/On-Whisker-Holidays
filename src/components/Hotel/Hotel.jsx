import { useParams } from "react-router-dom";
import { useHotels } from "../contexts/HotelsContext";
import styles from "./Hotel.module.css";
import { useEffect } from "react";
import Spinner from "../Common/Spinner";
import Message from "../Common/Message";

function Hotel() {
  const { id } = useParams();
  const { getHotel, currentHotel, isLoading } = useHotels();

  useEffect(
    function () {
      if (id) getHotel(id);
    },
    [id]
  );

  const { hotelName, city, detail, img, web, emoji } = currentHotel;

  if (!id)
    return (
      <Message
        message={"Click to a hotel to find out more!"}
        background={"light"}
      />
    );

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.details}>
      <p>{hotelName}</p>
      <p>{emoji}</p>
      <p>{city}</p>
      <p>{detail}</p>
      <p>{img}</p>
      <p>{web}</p>
    </div>
  );
}

export default Hotel;
