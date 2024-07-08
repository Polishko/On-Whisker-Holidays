import styles from "./Facilities.module.css";

function Facilities({ hotel }) {
  const { facilities } = hotel;

  return (
    <p className={styles.facilities}>
      {facilities.includes("wifi") && (
        <span>
          <i className="fa-solid fa-wifi"></i>
        </span>
      )}
      {facilities.includes("airconditioner") && (
        <span>
          <i className="fa-regular fa-snowflake"></i>
          <i className="fa-solid fa-temperature-quarter"></i>
        </span>
      )}

      {facilities.includes("parking") && (
        <span>
          <i className="fa-solid fa-square-parking"></i>
        </span>
      )}

      {facilities.includes("pool") && (
        <span>
          <i className="fa-solid fa-water-ladder"></i>
        </span>
      )}
    </p>
  );
}

export default Facilities;
