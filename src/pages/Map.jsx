import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import styles from "./Map.module.css";

import { useHotels } from "../components/contexts/HotelsContext";
import { useAuth } from "../components/contexts/AuthContext";
import { useGeolocation } from "../hooks/useGeoLocation";

import EmojiRenderer from "../components/common/EmojiRenderer";
import Button from "../components/common/Button";
import PageNav from "../components/common/PageNav";
import User from "../components/user/User";

function Map() {
  const { hotels } = useHotels();
  const { user, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Passed position from AppLayout
  const position = location.state?.position || null;

  // Initialized with default to Sofia
  const [mapPosition, setMapPosition] = useState([
    42.70540597995496, 23.328738252150977,
  ]);

  // Geolocation hook
  const { position: geoLocationPosition, getPosition } = useGeolocation();

  useEffect(() => {
    // hotel position
    if (position) {
      setMapPosition(position);
    } else {
      // use geolocation
      getPosition();
    }
  }, [position, getPosition]);

  useEffect(() => {
    if (!position && geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition, position]);

  const handleTopButtonClick = () => {
    navigate("/hotels");
  };

  return (
    <main className={styles.mapPage}>
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
      {user && isAuthenticated && <User />}
    </main>
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
