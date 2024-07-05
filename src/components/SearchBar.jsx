import { useRef, useState } from "react";
import { useHotels } from "./contexts/HotelsContext";
import styles from "./SearchBar.module.css";
import Button from "./Button";

function SearchBar() {
  const { filteredHotels, filterHotels } = useHotels();
  const inputEl = useRef(null);
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    filterHotels(newQuery);
  };

  const clearInput = () => {
    setQuery("");
    filterHotels("");
    inputEl.current.focus();
  };

  return (
    <div className={styles.searchbar}>
      <input
        className={styles.searchInput}
        placeholder="Enter search keywords"
        value={query}
        onChange={handleInputChange}
        ref={inputEl}
      />
      {query && (
        <Button className={styles.clearButton} onClick={clearInput}>
          &times;
        </Button>
      )}
      <span>{filteredHotels.length} hotels found</span>
    </div>
  );
}

export default SearchBar;
