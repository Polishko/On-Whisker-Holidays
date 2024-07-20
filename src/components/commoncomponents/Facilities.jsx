import styles from "./Facilities.module.css";

function Facilities({ hotel }) {
  const { facilities } = hotel;

  return (
    <div className={styles.facilities}>
      {facilities.includes("wifi") && (
        <div className={styles.iconContainer}>
          <i className={`fa-solid fa-wifi ${styles.icon}`}></i>
          <span className={styles.tooltipText}>WiFi</span>
        </div>
      )}
      {facilities.includes("airconditioner") && (
        <div className={styles.iconContainer}>
          <i className={`fa-solid fa-fan ${styles.icon}`}></i>
          <span className={styles.tooltipText}>Air conditioner</span>
        </div>
      )}

      {facilities.includes("parking") && (
        <div className={styles.iconContainer}>
          <i className={`fa-solid fa-square-parking ${styles.icon}`}></i>
          <span className={styles.tooltipText}>Parking</span>
        </div>
      )}

      {facilities.includes("pool") && (
        <div className={styles.iconContainer}>
          <i className={`fa-solid fa-water-ladder ${styles.icon}`}></i>
          <span className={styles.tooltipText}>Pool</span>
        </div>
      )}
    </div>
  );
}

export default Facilities;
