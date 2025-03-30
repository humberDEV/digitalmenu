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

export default function FontSelector({ font, setFont, isEditing }) {
  const [isOpen, setIsOpen] = useState(false);

  const currentFont = fonts.find((f) => f.name === font?.name) || fonts[0];

  return (
    <div className="dropdown dropdown-top min-w-full">
      <button
        className={`btn justify-center px-4 py-2 bg-gray-400 text-black rounded-lg flex items-center gap-4 transition-colors h-18 ${
          isEditing ? "hover:bg-gray-600" : "opacity-50 cursor-not-allowed"
        }`}
        onClick={() => isEditing && setIsOpen(!isOpen)}
        disabled={!isEditing}
      >
        <div className="flex items-center gap-4">
          <span className={`${font} text-2xl`}>Aa</span>
          <span>{currentFont.name}</span>
          <ChevronDown size={24} />
        </div>
      </button>

      {isOpen && (
        <ul className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-full mt-2">
          {fonts.map((f) => (
            <li key={f.name}>
              <button
                disabled={!isEditing}
                className={`flex items-center gap-4 py-3 px-4 rounded-lg transition-colors ${
                  font === f.class
                    ? "bg-gray-200"
                    : isEditing
                    ? "hover:bg-gray-100"
                    : "cursor-not-allowed opacity-50"
                }`}
                onClick={() => {
                  if (isEditing) {
                    setFont(f);
                    setIsOpen(false);
                  }
                }}
              >
                <span className={`${f.class} text-2xl`}>Aa</span>
                <span>{f.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
