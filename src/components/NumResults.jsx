import { useHotels } from "./contexts/HotelsContext";
import styles from "./NumResults.module.css";

function NumResults({ movies }) {
    const {hotels} = useHotels();
    const numHotels = hotels.length 
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default NumResults;
