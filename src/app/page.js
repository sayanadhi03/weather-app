"use client";
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { useWeather } from "./utils/useWeather";
import WeatherApp from "./components/WeatherApp";
import Highlights from "./components/Highlights";
import OtherCountriesWeather from "./components/OtherCountriesWeather";

export default function Home() {
  const {
    weather,
    highlights,
    location,
    setLocation,
    forecast,
    temperatureUnit,
    setTemperatureUnit,
    citiesWeather,
    setCitiesWeather,
    cityError,
    loading,
    error,
  } = useWeather();

  const handleAddCity = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error("City not found or API error");
      }

      const newCityWeather = await response.json();

      if (citiesWeather.some((city) => city.id === newCityWeather.id)) {
        throw new Error("City already in list");
      }

      setCitiesWeather((prev) => [...prev, newCityWeather]);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleRemoveCity = (cityId) => {
    setCitiesWeather((prev) => prev.filter((city) => city.id !== cityId));
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white">
      <div className="flex-1 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col ml-2 mb-4">
            <span className="text-lg md:text-xl lg:text-lg">
              HI, Sayan this side
            </span>
            <span className="text-lg md:text-xl lg:text-lg">
              My LinkedIn Profile:{" "}
              <a
                href="https://www.linkedin.com/in/sayan-adhikary-13077a1ab/"
                className="text-blue-400 hover:underline"
              >
                LinkedIn
              </a>
            </span>
            <span className="text-sm md:text-md lg:text-xl font-bold">
              Welcome to the Weather App
            </span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <SearchBar location={location} setLocation={setLocation} />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/19 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        {cityError && (
          <div className="bg-red-500/19 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-4">
            {cityError}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          {weather && (
            <WeatherCard
              weather={weather}
              unit={temperatureUnit}
              onToggleUnit={setTemperatureUnit}
            />
          )}

          {highlights && <Highlights highlights={highlights} />}
        </div>

        <div className="mt-6 flex flex-col md:flow-row gap-4">
          <OtherCountriesWeather
            citiesWeather={citiesWeather}
            loading={loading.cities}
            unit={temperatureUnit}
            onAddCity={handleAddCity}
            onRemoveCity={handleRemoveCity}
          />
          <WeatherApp
            forecast={forecast}
            loading={loading.forecast}
            unit={temperatureUnit}
          />
        </div>
      </div>
    </div>
  );
}
