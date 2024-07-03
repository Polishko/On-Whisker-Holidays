import styles from "./AppLayout.module.css";
import HotelList from "../components/HotelList";
import Details from "../components/Details";
import Map from "../components/Map";
import User from "../components/User";
import PageNav from "../components/PageNav";
import SearchBar from "../components/SearchBar";

function AppLayout() {
  return (
    <div>
      <PageNav />
      <div className={styles.app}>
        <SearchBar />

        <div className={styles.container}>
          <div className={styles.left}>
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
