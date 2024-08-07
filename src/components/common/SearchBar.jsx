import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "./SearchBar.module.css";

import { useHotels } from "../contexts/HotelsContext";

import Button from "./Button";
import Spinner from "./Spinner";

function SearchBar({ filteredHotels, setCurrentQuery }) {
  // currentQuery is the global in all App and searchCuery is the local in search bar
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );

  const inputEl = useRef(null);
  const { isLoading } = useHotels();

  // new (remember query upon navigating forward and back and if user changes it)
  useEffect(() => {
    const initialQuery = searchParams.get("query") || "";
    setSearchQuery(initialQuery);
    setCurrentQuery(initialQuery);
  }, [searchParams, setCurrentQuery]);

  const handleSearchInputChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    setCurrentQuery(newQuery); // Sync with parent immediately; url update might be slightly slower
    if (newQuery) {
      setSearchParams({ query: newQuery });
    } else {
      setSearchParams({});
    }
  };

  const clearSearchInput = () => {
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
          onChange={handleSearchInputChange}
          ref={inputEl}
          autoComplete="off"
          name={`search_${Math.random().toString(36).substring(2)}`}
          id={`search_${Math.random().toString(36).substring(2)}`}
        />
        {searchQuery && (
          <Button className={styles.clearButton} onClick={clearSearchInput}>
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
