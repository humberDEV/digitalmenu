import React, { useState, useEffect, useRef } from "react";
import { SwatchesPicker } from "react-color";

export default function ColorSelector({ color, setColor, isEditing }) {
  const [colorSelectorOpen, setColorSelectorOpen] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setColorSelectorOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Función para calcular el brillo del color
  const getBrightness = (hex) => {
    if (!hex) {
      return;
    }
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  // Determina si el color de fondo es oscuro o claro
  const isDark = getBrightness(color) < 128;

  return (
    <div>
      <button
        disabled={!isEditing}
        className={`bg-gray-200 p-4 rounded-xl text-2xl shadow-md w-20 h-18 hover:bg-gray-300 transition-all duration-200 flex items-center justify-center ${
          !isEditing ? "opacity-50 cursor-not-allowed" : ""
        }`}
        style={{ backgroundColor: color, color: isDark ? "white" : "black" }}
        onClick={() => setColorSelectorOpen(!colorSelectorOpen)}
      >
        <span className="text-xs">{color}</span>
      </button>

      {colorSelectorOpen && (
        <div className="absolute z-10 rounded-lg" ref={pickerRef}>
          <SwatchesPicker
            color={color}
            onChange={(newColor) => {
              setColor(newColor.hex);
              setColorSelectorOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
