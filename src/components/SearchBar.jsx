import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.searchbar}>
      <input
        className={styles.searchInput}
        placeholder="Enter search keywords"
      />
    </div>
  );
}

export default SearchBar;
