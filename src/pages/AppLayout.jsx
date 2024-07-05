import styles from "./AppLayout.module.css";
import HotelList from "../components/Hotel/HotelList";
import Details from "../components/Details/HotelDetails";
import Map from "../components/Map/Map";
import User from "../components/User";
import PageNav from "../components/PageNav";
import SearchBar from "../components/SearchBar";

function AppLayout() {
  return (
    <div className={styles.appLayout}>
      <PageNav />
      <div className={styles.app}>
        <div className={styles.container}>
          <div className={styles.left}>
            <SearchBar />
            <HotelList />
          </div>
          <div className={styles.right}>
            <Details />
            <Map />
          </div>
        </div>
      </div>
      <User />
    </div>
  );
}

export default AppLayout;
