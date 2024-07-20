import styles from "./Weather.module.css";
import { useEffect, useState } from "react";
import Spinner from "./Spinner.jsx";

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
    async function fetchWeather() {
      try {
        setIsLoading(true);
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current_weather=true`
        );

        if (!weatherRes.ok)
          throw new Error("Something went wrong with weather fetch");

        const weatherData = await weatherRes.json();
        setCurrentWeather(weatherData.current_weather);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();
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
