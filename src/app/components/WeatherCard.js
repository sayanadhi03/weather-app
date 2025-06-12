import React from "react";
import { FaMapMarkedAlt, FaWind, FaTint } from "react-icons/fa";
import moment from "moment-timezone";
import { convertTemperature, formatTemperature } from "../utils/temperature";
import TemperatureToggle from "./TemperatureToggle";

const LocationHeader = ({ name, country }) => (
  <div className="flex items-center p-2 rounded-lg bg-[#363636]">
    <FaMapMarkedAlt className="text-sm md:text-lg mr-2 text-gray-300" />
    <h2 className="text-sm md:text-lg font-normal">
      {name}, {country}
    </h2>
  </div>
);

const DateDisplay = ({ date }) => (
  <div className="text-left mb-4">
    <h3 className="md:text-3xl text-xl font-semibold">{date.format("dddd")}</h3>
    <h3 className="md:text-xl text-md mt-2 text-gray-300">
      {date.format("DD MMM YYYY")}
    </h3>
  </div>
);

const WeatherIconComponent = ({ icon, description }) => (
  <div>
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt={description}
      className="w-24 h-24 md:w-36 md:h-36 mb-4"
    />
  </div>
);

const WeatherDetails = ({ wind, humidity, pressure, visibility }) => (
  <div className="grid grid-cols-2 gap-4 mt-4">
    <div className="flex items-center gap-2 text-gray-300">
      <FaWind className="text-lg" />
      <span>Wind: {wind.speed} m/s</span>
    </div>
    <div className="flex items-center justify-end gap-2 text-gray-300">
      <FaTint className="text-lg" />
      <span>Humidity: {humidity}%</span>
    </div>
    <div className="flex items-center gap-2 text-gray-300">
      <span>Pressure: {pressure} hPa</span>
    </div>
    <div className="flex items-center justify-end gap-2 text-gray-300">
      <span>Visibility: {visibility / 1000} km</span>
    </div>
  </div>
);

const TemperatureDisplay = ({ temp, feelsLike, description, unit }) => (
  <div className="text-center">
    <div className="md:text-6xl text-4xl text-right font-bold">
      {formatTemperature(temp, unit)}
    </div>
    <div className="text-2xl text-right text-gray-200">
      {formatTemperature(feelsLike, unit)}
    </div>
    <div className="md:text-2xl text-xl capitalize mt-2 text-right">
      {description}
    </div>
    <div className="mt-2 text-right text-gray-200">
      Feels like: {formatTemperature(feelsLike, unit)}
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
    <div className="rounded-xl p-6 flex-1 shadow-lg bg-[#1e1e1e] text-white">
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
