import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./HotelList.module.css";

import { useHotels } from "../contexts/HotelsContext";

import Spinner from "../common/Spinner";
import Message from "../common/Message";
import HotelItem from "./HotelItem";

function HotelList({ filteredHotels, currentQuery }) {
  const { hotels, isLoading } = useHotels();
  const listRef = useRef(null);
  const [lastClickedPosition, setLastClickedPosition] = useState(null);

  // set last clicked hotel position for scroller
  useEffect(() => {
    const storedPosition = localStorage.getItem("lastClickedPosition");
    if (storedPosition) {
      setLastClickedPosition(JSON.parse(storedPosition));
    }
  }, []);

  const setListRef = useCallback(
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
        <HotelItem hotel={hotel} key={hotel.id} currentQuery={currentQuery} />
      ))}
    </ul>
  );
}

export default HotelList;
