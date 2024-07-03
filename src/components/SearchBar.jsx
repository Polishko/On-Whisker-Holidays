import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <input className={styles.searchbar} placeholder="Enter search keywords" />
  );
}

export default SearchBar;
