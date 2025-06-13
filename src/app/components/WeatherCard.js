import React from "react";
import { FaMapMarkedAlt, FaWind, FaTint } from "react-icons/fa";
import moment from "moment-timezone";
import { convertTemperature, formatTemperature } from "../utils/temperature";
import TemperatureToggle from "./TemperatureToggle";

const LocationHeader = ({ name, country }) => (
  <div className="flex items-center p-3 rounded-lg bg-[#3f3f3f]">
    <FaMapMarkedAlt className="text-sm md:text-lg mr-2 text-[rgb(var(--secondary-text-rgb))]" />
    <h2 className="text-sm md:text-lg font-medium text-[rgb(var(--primary-text-rgb))]">
      {name}, {country}
    </h2>
  </div>
);

const DateDisplay = ({ date }) => (
  <div className="text-left mb-6">
    <h3 className="text-2xl md:text-4xl font-medium text-[rgb(var(--primary-text-rgb))]">{date.format("dddd")}</h3>
    <h3 className="text-lg md:text-2xl mt-2 text-[rgb(var(--secondary-text-rgb))]">
      {date.format("DD MMM YYYY")}
    </h3>
  </div>
);

const WeatherIconComponent = ({ icon, description }) => (
  <div>
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt={description}
      className="w-24 h-24 md:w-36 md:h-36 mb-6"
    />
  </div>
);

const WeatherDetails = ({ wind, humidity, pressure, visibility }) => (
  <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-[rgb(var(--secondary-text-rgb))]">
    <div className="flex items-center gap-2">
      <FaWind className="text-lg" />
      <span>Wind: {wind.speed} m/s</span>
    </div>
    <div className="flex items-center justify-end gap-2">
      <FaTint className="text-lg" />
      <span>Humidity: {humidity}%</span>
    </div>
    <div className="flex items-center gap-2">
      <span>Pressure: {pressure} hPa</span>
    </div>
    <div className="flex items-center justify-end gap-2">
      <span>Visibility: {visibility / 1000} km</span>
    </div>
  </div>
);

const TemperatureDisplay = ({ temp, feelsLike, description, unit }) => (
  <div className="text-center">
    <div className="text-5xl md:text-7xl text-right font-semibold text-[rgb(var(--primary-text-rgb))]">
      {formatTemperature(temp, unit)}
    </div>
    <div className="text-xl text-right text-[rgb(var(--secondary-text-rgb))] mt-1">
      Feels like: {formatTemperature(feelsLike, unit)}
    </div>
    <div className="text-lg md:text-xl capitalize mt-2 text-right text-[rgb(var(--secondary-text-rgb))]">
      {description}
    </div>
  </div>
);

const WeatherCard = ({ weather, unit, onToggleUnit }) => {
  if (!weather) return null;

  const {
    main,
    weather: WeatherData,
    name,
    sys,
    timezone,
    wind,
    visibility,
  } = weather;

  const iconCode = WeatherData[0]?.icon;
  const description = WeatherData[0]?.description;

  const timeZoneName = moment.tz.guess();
  const date = moment().tz(timeZoneName);

  const temp = convertTemperature(main.temp, unit);
  const feelsLike = convertTemperature(main.feels_like, unit);

  return (
    <div className="rounded-xl p-8 flex-1 shadow-xl bg-[#2a2a2a] text-[rgb(var(--primary-text-rgb))]">
      <div className="flex flex-col items-center mb-4">
        <LocationHeader name={name} country={sys.country} />
        <TemperatureToggle unit={unit} onToggle={onToggleUnit} />
      </div>
      <DateDisplay date={date} />
      <div className="flex justify-between items-center">
        <WeatherIconComponent icon={iconCode} description={description} />
        <TemperatureDisplay
          temp={temp}
          feelsLike={feelsLike}
          description={description}
          unit={unit}
        />
      </div>
      <WeatherDetails
        wind={wind.speed}
        humidity={main.humidity}
        pressure={main.pressure}
        visibility={visibility}
      />
    </div>
  );
};

export default WeatherCard;
