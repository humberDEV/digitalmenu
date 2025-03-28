import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const fonts = [
  { name: "Roboto", class: "font-roboto" },
  { name: "Open Sans", class: "font-open-sans" },
  { name: "Montserrat", class: "font-montserrat" },
  { name: "Lato", class: "font-lato" },
  { name: "Poppins", class: "font-poppins" },
  { name: "Playfair Display", class: "font-playfair" },
  { name: "Source Code Pro", class: "font-source-code" },
  { name: "Fira Code", class: "font-fira-code" },
];

export default function FontSelector({
  themeConfig,
  setThemeConfig,
  isEditing,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown dropdown-top min-w-full">
      <button
        className={`btn justify-center px-4 py-2 bg-gray-400 text-black rounded-lg flex items-center gap-4 hover:bg-gray-600 transition-colors h-18 ${
          !isEditing ? "opacity-50 cursor-not-allowed hover:bg-gray-400" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        disabled={!isEditing}
      >
        <div className="flex items-center gap-4">
          <span className={`${themeConfig.fontFamily} text-2xl`}>Aa</span>
          <span>{themeConfig.fontFamily}</span>
          <ChevronDown size={24} />
        </div>
      </button>

      <ul
        className={`dropdown-content menu p-2 shadow-lg bg-white rounded-box w-full mt-2 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {fonts.map((font) => (
          <li key={font.name}>
            <button
              disabled={!isEditing}
              className={`flex items-center gap-4 py-3 px-4 rounded-lg transition-colors ${
                themeConfig.font === font.class
                  ? "bg-gray-200"
                  : `hover:bg-gray-100 ${
                      !isEditing ? "cursor-not-allowed opacity-50" : ""
                    }`
              }`}
              onClick={() => {
                if (isEditing) {
                  setThemeConfig({ ...themeConfig, font: font.class });
                  setIsOpen(false);
                }
              }}
            >
              <span className={`${font.class} text-2xl`}>Aa</span>
              <span>{font.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
