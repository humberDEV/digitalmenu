"use client";

import { useState, useEffect } from "react";

import ColorSelector from "./ui/ColorSelector";
import FontSelector from "./ui/FontSelector";

const SOCIAL_MEDIA = ["TikTok", "Instagram", "Facebook", "X (Twitter)"];
const DELIVERIES = ["Glovo", "Uber Eats", "Just Eat", "Deliveroo"];
const LANGUAGES = {
  es: "Español",
  en: "Inglés",
  fr: "Francés",
  de: "Alemán",
  it: "Italiano",
};

const ColorPicker = ({ label, color, setColor, isEditing }) => (
  <div className="form-control mb-6 flex flex-col gap-2">
    <label className="label justify-center flex">
      <span className="label-text text-sm text-center">{label}</span>
    </label>
    <div className="flex justify-center gap-4">
      <ColorSelector color={color} setColor={setColor} isEditing={isEditing} />
    </div>
  </div>
);

export default function PagePersonalization({
  businessData,
  setBusinessData,
  isEditing,
}) {
  console.log(businessData);

  const [useLogo, setUseLogo] = useState(false);

  useEffect(() => {
    if (businessData?.logoUrl) {
      setUseLogo(true);
    }
  }, [businessData.logoUrl]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBusinessData((prev) => ({ ...prev, logoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (e) => {
    setBusinessData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleToggleLogo = () => {
    setUseLogo((prev) => !prev);
    if (useLogo) {
      setBusinessData((prev) => ({ ...prev, logoUrl: null }));
    } else {
      setBusinessData((prev) => ({ ...prev, name: null }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name) => {
    setBusinessData((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleURLChange = (platform, value) => {
    setBusinessData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  };

  const handleDeliveryChange = (platform, value) => {
    setBusinessData((prev) => ({
      ...prev,
      deliveryLinks: { ...prev.deliveryLinks, [platform]: value },
    }));
  };

  const handleLanguageChange = (lang) => {
    setBusinessData((prev) => {
      const newLanguages = prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang];
      return { ...prev, languages: newLanguages };
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Título o Logo</h2>
        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              checked={useLogo}
              onChange={handleToggleLogo}
              className="toggle toggle-primary"
            />
            Usar logo
          </label>
        </div>

        {useLogo ? (
          <div>
            <input
              type="file"
              className="file-input"
              onChange={handleLogoChange}
            />
            {businessData.logoUrl && (
              <div>
                <img
                  src={businessData.logoUrl}
                  alt="Logo Preview"
                  className="mt-2"
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={businessData.name || ""}
              onChange={handleTitleChange}
              placeholder="Escribe el título"
              required
              disabled={!isEditing}
              className="input text-lg border p-1 rounded flex-1 mr-2 w-full"
            />
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Subtítulo</h2>
        <input
          type="text"
          name="subtitle"
          placeholder="Subtítulo"
          className=" input text-lg border p-1 rounded flex-1 mr-2 w-full"
          value={businessData.subtitle || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Idiomas</h2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(LANGUAGES).map(([code, lang]) => (
            <label key={code} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={businessData.languages.includes(code)}
                onChange={() => handleLanguageChange(code)}
                className="checkbox checkbox-primary"
                disabled={!isEditing}
              />
              {lang}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 ">Colores</h2>
        <div className="flex flex-wrap gap-4">
          <ColorPicker
            label="Color de Fondo"
            color={businessData.theme.backgroundColor}
            setColor={(color) =>
              setBusinessData({
                ...businessData,
                theme: { ...businessData.theme, backgroundColor: color },
              })
            }
            isEditing={isEditing}
          />
          <ColorPicker
            label="Color de Texto"
            color={businessData.theme.textColor}
            setColor={(color) =>
              setBusinessData({
                ...businessData,
                theme: { ...businessData.theme, textColor: color },
              })
            }
            isEditing={isEditing}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Fuente</h2>
        <FontSelector
          font={businessData.theme.fontFamily}
          setFont={(font) =>
            setBusinessData({
              ...businessData,
              theme: { ...businessData.theme, fontFamily: font },
            })
          }
          isEditing={isEditing}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Botón de pedir reseñas en Google
        </h2>
        <input
          type="checkbox"
          checked={businessData.showReviewButton}
          onChange={() => handleToggle("showReviewButton")}
          className="toggle toggle-primary"
          disabled={!isEditing}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Redes Sociales
        </h2>
        <div className="flex flex-col flex-wrap gap-4">
          {SOCIAL_MEDIA.map((platform) => (
            <input
              key={platform}
              type="url"
              placeholder={`URL de ${platform}`}
              value={businessData.socialLinks[platform.toLowerCase()] || ""}
              onChange={(e) =>
                handleURLChange(platform.toLowerCase(), e.target.value)
              }
              className="text-lg border p-1 rounded flex-1 mr-2 w-full"
              disabled={!isEditing}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Plataformas de Delivery
        </h2>
        <div className="flex flex-col flex-wrap gap-4">
          {DELIVERIES.map((platform) => (
            <input
              key={platform}
              type="url"
              placeholder={`URL de ${platform}`}
              value={businessData.deliveryLinks[platform.toLowerCase()] || ""}
              onChange={(e) =>
                handleDeliveryChange(platform.toLowerCase(), e.target.value)
              }
              className="text-lg border p-1 rounded flex-1 mr-2 w-full"
              disabled={!isEditing}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Número Telefónico
        </h2>
        <input
          type="tel"
          name="phone"
          placeholder="Número telefónico"
          className="text-lg border p-1 rounded flex-1 mr-2 w-full"
          value={businessData.phone || ""}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>
    </div>
  );
}
