import styles from "./AppLayout.module.css";
import SideBar from "./SideBar";
import Details from "./Details";
import Map from "./Map";
import User from "./User";

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Details />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
