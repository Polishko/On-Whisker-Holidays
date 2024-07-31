import styles from "./Map.module.css";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useHotels } from "../components/contexts/HotelsContext";

import EmojiRenderer from "../components/common/EmojiRenderer";
import Button from "../components/common/Button";
import PageNav from "../components/common/PageNav";

function Map() {
  const navigate = useNavigate();
  const { hotels } = useHotels();
  const location = useLocation();

  const position = location.state?.position;

  const [mapPosition, setMapPosition] = useState([
    42.70540597995496, 23.328738252150977,
  ]);

  useEffect(
    function () {
      if (position) {
        const [mapLat, mapLng] = position;
        setMapPosition([mapLat, mapLng]);
      }
    },
    [position]
  );

  const handleTopButtonClick = () => {
    navigate("/hotels");
  };

  return (
    <div className={styles.mapPage}>
      <PageNav />
      <div className={styles.mapContainer}>
        <div className={styles.buttonContainer}>
          <Button
            type={"secondary"}
            className={styles.mapButton}
            onClick={handleTopButtonClick}
          >
            Search Hotel List
          </Button>
        </div>
        <MapContainer
          center={mapPosition}
          zoom={10}
          scrollWheelZoom={true}
          className={styles.map}
        >
          <MapCenter mapPosition={mapPosition} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            maxZoom={20}
          />
          {hotels.map((hotel) => (
            <Marker
              position={[hotel.position.lat, hotel.position.lng]}
              key={hotel.id}
            >
              <Popup className={styles.popup}>
                <p>{hotel.hotelName}</p>
                <p>
                  <EmojiRenderer emoji={hotel.countryCode} />
                </p>

                <Link
                  to={`/hotels/${hotel.id}?lat=${hotel.position.lat}&lng=${hotel.position.lng}`}
                  key={hotel.id}
                  className={styles.seeDetails}
                >
                  <p>See details</p>
                </Link>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

function MapCenter({ mapPosition }) {
  const map = useMap();

  useEffect(() => {
    if (mapPosition) {
      map.setView(mapPosition);
    }
  }, [map, mapPosition]);

  return null;
}

export default Map;
