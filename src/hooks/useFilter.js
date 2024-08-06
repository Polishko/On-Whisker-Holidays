import { useState, useEffect } from "react";
import { containsAllKeywords } from "../utils/string";

export const useFilter = (hotels, query, isLoading) => {
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    if (isLoading) {
      setFilteredHotels([]); // While loading, keep empty
    } else if (query) {
      const filtered = hotels.filter((hotel) =>
        containsAllKeywords(hotel.keywords, query)
      );
      setFilteredHotels(filtered);
    } else {
      setFilteredHotels(hotels);
    }
  }, [hotels, query, isLoading]);

  return filteredHotels;
};
