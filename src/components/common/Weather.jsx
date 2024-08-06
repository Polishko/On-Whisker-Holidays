// Adapted slightly from  Jonas Schmedtmann's Ultimate React Course on Udemy

import { useEffect, useState } from "react";
import styles from "./Weather.module.css";
import Spinner from "./Spinner.jsx";
import { fetchWeatherData } from "../../utils/api.js";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function Weather({ latitude, longitude }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getWeather() {
      try {
        setIsLoading(true);
        const weather = await fetchWeatherData(latitude, longitude);
        setCurrentWeather(weather);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getWeather();
  }, [latitude, longitude]);

  if (isLoading) return <Spinner />;
  if (!currentWeather) return null;

  const { temperature, weathercode } = currentWeather;

  return (
    <div className={styles.weather}>
      <span>{getWeatherIcon(weathercode)}</span>
      <p className={styles.temperature}>{`${Math.floor(temperature)}°C`}</p>
    </div>
  );
}

export default Weather;
