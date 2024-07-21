import styles from "./HotelList.module.css";
import { useHotels } from "../contexts/HotelsContext";
import Spinner from "../common/Spinner";
import Message from "../common/Message";
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
    <ul
      style={{ height: "500px", overflowY: "scroll" }}
      className={styles.hotelList}
    >
      {filteredHotels.map((hotel) => (
        <HotelItem hotel={hotel} key={hotel.id} location={location} />
      ))}
    </ul>
  );
}

export default HotelList;
