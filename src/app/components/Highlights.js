import React from "react";
import {
  FaWind,
  FaTint,
  FaSun,
  FaMoon,
  FaEye,
  FaTemperatureHigh,
  FaSmog,
} from "react-icons/fa";

const HighlightCard = ({
  icon: Icon,
  title,
  value,
  unit = "",
  badge = null,
}) => (
  <div className="bg-[#1e1e1e] rounded-lg p-4">
    <div className="flex items-center gap-2 text-gray-400 mb-2">
      <Icon className="text-lg" />
      <span className="text-sm">{title}</span>
    </div>
    <div className="text-xl font-semibold flex items-center gap-2">
      {value}
      {unit && <span className="text-sm text-gray-400">{unit}</span>}
      {badge}
    </div>
  </div>
);

const Highlights = ({ highlights, airQuality }) => {
  if (!highlights) return null;

  const { wind, humidity, visibility, sunrise, sunset, uv } = highlights;
  const aqi = airQuality?.list?.[0]?.main?.aqi;

  const components = airQuality?.list?.[0]?.components || {};

  const getAQILabel = (aqi) => {
    switch (aqi) {
      case 1:
        return { label: "Good", color: "bg-green-500 text-white" };
      case 2:
        return { label: "Fair", color: "bg-yellow-400 text-black" };
      case 3:
        return { label: "Moderate", color: "bg-orange-400 text-white" };
      case 4:
        return { label: "Poor", color: "bg-red-500 text-white" };
      case 5:
        return { label: "Very Poor", color: "bg-purple-600 text-white" };
      default:
        return { label: "Unknown", color: "bg-gray-400 text-white" };
    }
  };

  const { label: aqiLabel, color: aqiColor } = getAQILabel(aqi);

  const AQIBadge = () => (
    <span
      className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${aqiColor}`}
    >
      {aqiLabel} ({aqi})
    </span>
  );

  return (
    <div className="flex-1 bg-[#1e1e1e] rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Today&apos;s Highlights</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <HighlightCard
          icon={FaWind}
          title="Wind Speed"
          value={wind}
          unit="m/s"
        />
        <HighlightCard
          icon={FaTint}
          title="Humidity"
          value={humidity}
          unit="%"
        />
        <HighlightCard
          icon={FaEye}
          title="Visibility"
          value={visibility}
          unit="km"
        />
        <HighlightCard icon={FaTemperatureHigh} title="UV Index" value={uv} />
        <HighlightCard icon={FaSun} title="Sunrise" value={sunrise} />
        <HighlightCard icon={FaMoon} title="Sunset" value={sunset} />

        {airQuality && (
          <>
            <HighlightCard
              icon={FaSmog}
              title="Air Quality Index"
              value=""
              badge={<AQIBadge />}
            />

            <HighlightCard
              icon={FaSmog}
              title="CO"
              value={components.co}
              unit="μg/m³"
            />
            <HighlightCard
              icon={FaSmog}
              title="NO₂"
              value={components.no2}
              unit="μg/m³"
            />

            <HighlightCard
              icon={FaSmog}
              title="O₃"
              value={components.o3}
              unit="μg/m³"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Highlights;
