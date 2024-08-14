import { useRef } from "react";

import styles from "./SearchBar.module.css";

import { useHotels } from "../contexts/HotelsContext";
import { useSearchQuery } from "../contexts/SearchQueryContext";

import Button from "./Button";
import Spinner from "./Spinner";

function SearchBar({ filteredHotels }) {
  const inputEl = useRef(null);
  const { isLoading } = useHotels();
  const { currentSearchQuery, setSearchQuery, clearSearchQuery } =
    useSearchQuery();

  const handleSearchInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
  };

  const handleClearSearchInput = () => {
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
