import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./SearchBar.module.css";

import { useHotels } from "../contexts/HotelsContext";

import Button from "./Button";
import Spinner from "./Spinner";

function SearchBar({ filteredHotels, setCurrentQuery }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );

  const inputEl = useRef(null);
  const { isLoading } = useHotels();

  // new (remember query upon navigating forward and back)
  useEffect(() => {
    const initialQuery = searchParams.get("query") || "";
    setSearchQuery(initialQuery);
    setCurrentQuery(initialQuery);
  }, [searchParams, setCurrentQuery]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    setCurrentQuery(newQuery); // Sync with parent
    if (newQuery) {
      setSearchParams({ query: newQuery });
    } else {
      setSearchParams({});
    }
  };

  const clearInput = () => {
    setCurrentQuery("");
    setSearchQuery("");
    setSearchParams({});
    inputEl.current.focus();
  };

  const hotelCount = filteredHotels.length;

  return (
    <div className={styles.searchbar}>
      <div className={styles.inputContainer}>
        <input
          className={styles.searchInput}
          placeholder="Enter search keywords"
          value={searchQuery}
          onChange={handleInputChange}
          ref={inputEl}
          autoComplete="off"
          name={`search_${Math.random().toString(36).substring(2)}`}
          id={`search_${Math.random().toString(36).substring(2)}`}
        />
        {searchQuery && (
          <Button className={styles.clearButton} onClick={clearInput}>
            &times;
          </Button>
        )}
      </div>
      <span className={styles.filterResults}>
        {isLoading ? (
          <Spinner />
        ) : hotelCount === 1 ? (
          `${hotelCount} hotel`
        ) : (
          `${hotelCount} hotels`
        )}
      </span>
    </div>
  );
}

export default SearchBar;
