import React from "react";

const TemperatureButton = ({ unit, currentUnit, onClick }) => {
  return (
    <button
      onClick={() => onClick(unit)}
      aria-pressed={currentUnit === unit}
      aria-label={`switch to ${unit}°`}
      className={`px-3 py-1 rounded transition-all duration-200 text-[rgb(var(--primary-text-rgb))] ${
        currentUnit === unit
          ? "bg-sky-700 shadow-md"
          : "bg-[#3f3f3f] hover:bg-[#4a4a4a]"
      }`}
    >
      {unit}°
    </button>
  );
};

const TemperatureToggle = ({ unit, onToggle }) => {
  return (
    <div
      className="flex items-center bg-[#2a2a2a] rounded-lg p-1"
      role="radiogroup"
      aria-label="Temperature unit"
    >
      <TemperatureButton unit="F" currentUnit={unit} onClick={onToggle} />
      <TemperatureButton unit="C" currentUnit={unit} onClick={onToggle} />
    </div>
  );
};

export default TemperatureToggle;
