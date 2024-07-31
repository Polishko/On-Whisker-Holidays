import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);

  function getPosition() {
    if (!navigator.geolocation) {
      console.error("Your browser does not support geolocation");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (error) => {
        console.error(error.message);
      }
    );
  }

  return { position, getPosition };
}
