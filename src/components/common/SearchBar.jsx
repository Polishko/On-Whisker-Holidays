import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";
import Button from "./Button";

function SearchBar({ filteredHotels }) {
  const inputEl = useRef(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.trim() === "") {
      navigate("/hotels");
    } else {
      navigate(`/search/${newQuery}`);
    }
  };

  const clearInput = () => {
    setQuery("");
    inputEl.current.focus();
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
