import styles from "./HotelList.module.css";
import { useHotels } from "../contexts/HotelsContext";
import Spinner from "../Common/Spinner";
import Message from "../Common/Message";
import HotelItem from "./HotelItem";

function HotelList() {
  const { hotels, filteredHotels, isLoading } = useHotels();

  if (isLoading) return <Spinner />;

  if (!hotels.length)
    return (
      <Message
        message={"Currently no hotels can be found."}
        background={"light"}
      />
    );

  return (
    <ul className={styles.hotelList}>
      {filteredHotels.map((hotel) => (
        <HotelItem hotel={hotel} key={hotel.id} />
      ))}
    </ul>
  );
}

export default HotelList;
