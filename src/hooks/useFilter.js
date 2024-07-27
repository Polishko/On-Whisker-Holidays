import { useState, useEffect } from "react";
import { containsAllKeywords } from "../utils/string";

export const useFilter = (hotels, query) => {
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    if (query) {
      const filtered = hotels.filter((hotel) =>
        containsAllKeywords(hotel.keywords, query)
      );
      setFilteredHotels(filtered);
    } else {
      setFilteredHotels(hotels);
    }
  }, [hotels, query]);

  return filteredHotels;
};
