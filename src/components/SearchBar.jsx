import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHotels } from "./contexts/HotelsContext";
import styles from "./SearchBar.module.css";
import Button from "./Common/Button";

function SearchBar() {
  const { filteredHotels, filterHotels } = useHotels();
  const inputEl = useRef(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim() === "") {
      filterHotels("");
      navigate("/hotels");
    } else {
      filterHotels(newQuery);
      navigate(`/search/${newQuery}`);
    }
  };

  const clearInput = () => {
    setQuery("");
    filterHotels("");
    inputEl.current.focus();
    navigate(`/hotels`);
  };

  return (
    <div className={styles.searchbar}>
      <div className={styles.inputContainer}>
        <input
          className={styles.searchInput}
          placeholder="Enter search keywords"
          value={query}
          onChange={handleInputChange}
          ref={inputEl}
          autoComplete="off"
          name={`search_${Math.random().toString(36).substring(2)}`}
          id={`search_${Math.random().toString(36).substring(2)}`}
        />
        {query && (
          <Button className={styles.clearButton} onClick={clearInput}>
            &times;
          </Button>
        )}
      </div>
      <span className={styles.filterResults}>
        {filteredHotels.length} hotels
      </span>
    </div>
  );
}

export default SearchBar;
