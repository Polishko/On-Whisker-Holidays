import styles from "./Map.module.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

import { useHotels } from "../components/contexts/HotelsContext";

function Map() {
  const navigate = useNavigate();
  const { hotels } = useHotels();

  const [mapPosition, setMapPosition] = useState([
    42.70540597995496, 23.328738252150977,
  ]);

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {hotels.map((hotel) => (
          <Marker
            position={[hotel.position.lat, hotel.position.lng]}
            key={hotel.id}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
