import { useRef } from "react";

import styles from "./SearchBar.module.css";

import { useHotels } from "../contexts/HotelsContext";
import { useSearchQuery } from "../contexts/SearchQueryContext";

import Button from "./Button";
import Spinner from "./Spinner";

function SearchBar({ filteredHotels, setIsUserTyping, setIsQueryCleared }) {
  const inputEl = useRef(null);
  const { isLoading } = useHotels();
  const { currentSearchQuery, setSearchQuery, clearSearchQuery } =
    useSearchQuery();
  const typingTimeoutRef = useRef(null);

  const handleSearchInputChange = (e) => {
    setIsQueryCleared(false);
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    setIsUserTyping(true);

    // Clear the previous timeout if any
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set a new timeout to reset isTyping after user stops typing for 500ms
    typingTimeoutRef.current = setTimeout(() => {
      setIsUserTyping(false);
    }, 500);
  };

  const handleClearSearchInput = () => {
    setIsQueryCleared(true);
    clearSearchQuery();
    inputEl.current.focus();
  };

  const hotelCount = filteredHotels.length;

  return (
    <div className={styles.searchbar}>
      <div className={styles.inputContainer}>
        <input
          className={styles.searchInput}
          placeholder="Enter search keywords"
          value={currentSearchQuery}
          onChange={handleSearchInputChange}
          ref={inputEl}
          autoComplete="off"
          name={`search_${Math.random().toString(36).substring(2)}`}
          id={`search_${Math.random().toString(36).substring(2)}`}
        />
        {currentSearchQuery && (
          <Button
            className={styles.clearButton}
            onClick={handleClearSearchInput}
          >
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
