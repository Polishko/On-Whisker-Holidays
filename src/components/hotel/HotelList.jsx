import styles from "./HotelList.module.css";
import { useHotels } from "../contexts/HotelsContext";
import Spinner from "../common/Spinner";
import Message from "../common/Message";
import HotelItem from "./HotelItem";
// import { useEffect, useRef, useState } from "react";
import { useRef } from "react";

function HotelList() {
  const { hotels, filteredHotels, isLoading } = useHotels();
  // const [isItemClicked, setIsItemClicked] = useState(false);

  const currHotel = useRef();

  // function handleItemClick() {
  //   setIsItemClicked((oldStatus) => !oldStatus);
  // }

  // useEffect(
  //   function () {
  //     if (currHotel.current) {
  //       console.log(`I am refreshed and I'm ${currHotel.current}`);
  //       // Move the scroller 2 pixels each time there is a click
  //       currHotel.current.scrollTop += 2;
  //       console.log(currHotel.current.scrollTop);
  //     }
  //   },
  //   [isItemClicked, currentHotel.current]
  // );

  if (isLoading) return <Spinner />;

  if (!hotels.length)
    return (
      <Message
        message={"Currently no hotels can be found."}
        background={"light"}
      />
    );

  return (
    <ul className={styles.hotelList} ref={currHotel}>
      {filteredHotels.map((hotel) => (
        <HotelItem
          hotel={hotel}
          key={hotel.id}
          // handleItemClick={handleItemClick}
        />
      ))}
    </ul>
  );
}

export default HotelList;
