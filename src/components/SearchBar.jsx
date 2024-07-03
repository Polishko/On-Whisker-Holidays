import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <input
      className={styles.searchbar}
      placeholder="Here will come a search bar"
    />
  );
}

export default SearchBar;
