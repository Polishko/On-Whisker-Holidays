import styles from "./Map.module.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

import { useHotels } from "../components/contexts/HotelsContext";
import EmojiRenderer from "../components/common/EmojiRenderer";

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
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
          maxZoom={20}
        />
        {hotels.map((hotel) => (
          <Marker
            position={[hotel.position.lat, hotel.position.lng]}
            key={hotel.id}
          >
            <Popup>
              <span>{hotel.hotelName}</span>
              <span>
                <span>
                  <EmojiRenderer emoji={hotel.countryCode} />
                </span>
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
