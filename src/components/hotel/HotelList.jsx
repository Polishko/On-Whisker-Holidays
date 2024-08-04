import { useCallback, useRef, useState } from "react";

import styles from "./HotelList.module.css";

import { useHotels } from "../contexts/HotelsContext";

import Spinner from "../common/Spinner";
import Message from "../common/Message";
import HotelItem from "./HotelItem";

function HotelList({ filteredHotels, currentQuery }) {
  const { hotels, isLoading } = useHotels();
  const listRef = useRef(null);
  const [lastClickedPosition, setLastClickedPosition] = useState(null);

  const handleItemClick = (itemPosition) => {
    setLastClickedPosition(itemPosition);
  };

  const setListRef = useCallback(
    // Callback to avoid adding listRef to dependency array and avoid unnecessary re-renders
    (node) => {
      if (node !== null) {
        listRef.current = node;

        if (lastClickedPosition) {
          const listRect = listRef.current.getBoundingClientRect();
          const offsetTop =
            lastClickedPosition.top - listRect.top + listRef.current.scrollTop;

          listRef.current.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    },
    [lastClickedPosition]
  );

  if (isLoading) return <Spinner />;

  if (!hotels.length)
    return (
      <Message
        message={"Currently no hotels can be found."}
        background={"light"}
      />
    );

  return (
    <ul className={styles.hotelList} ref={setListRef}>
      {filteredHotels.map((hotel) => (
        <HotelItem
          hotel={hotel}
          key={hotel.id}
          handleItemClick={handleItemClick}
          currentQuery={currentQuery}
        />
      ))}
    </ul>
  );
}

export default HotelList;
