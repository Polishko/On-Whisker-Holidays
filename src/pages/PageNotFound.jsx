import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <div className={styles.imageContainer}>
      <img
        src="/error.jpg"
        alt="page_not_found"
        className={styles.pageNotFound}
      />
    </div>
  );
}
