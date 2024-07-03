import styles from "./AppLayout.module.css";
import SideBar from "../components/SideBar";
import Details from "../components/Details";
import Map from "../components/Map";
import User from "../components/User";
import PageNav from "../components/PageNav";

function AppLayout() {
  return (
    <div className={styles.app}>
      <PageNav />
      <SideBar />
      <Details />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
