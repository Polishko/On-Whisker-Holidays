import styles from "./AppLayout.module.css";
import HotelList from "../components/hotel/HotelList";
// import HotelDetails from "../components/details/HotelDetails";
import Map from "../components/map/Map";
import PageNav from "../components/PageNav";
import SearchBar from "../components/SearchBar";
import Details from "../components/details/Details";
import { useAuth } from "../components/contexts/AuthContext";

function AppLayout() {
  const { user } = useAuth();
  console.log(user);
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
    </div>
  );
}

export default AppLayout;
