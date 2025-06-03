"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import ColorSelector from "./ui/ColorSelector";
import FontSelector from "./ui/FontSelector";

const SOCIAL_MEDIA = ["TikTok", "Instagram", "Facebook", "Twitter"];
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

const SocialLinksInputs = ({ data, onChange, isEditing }) => (
  <div className="flex flex-col flex-wrap gap-4">
    {SOCIAL_MEDIA.map((platform) => (
      <input
        key={platform}
        type="url"
        placeholder={`URL de ${platform}`}
        value={data?.[platform.toLowerCase()] ?? ""}
        onChange={(e) => onChange(platform.toLowerCase(), e.target.value)}
        className="text-lg border p-1 rounded flex-1 mr-2 w-full"
        disabled={!isEditing}
      />
    ))}
  </div>
);

const DeliveryLinksInputs = ({ data, onChange, isEditing }) => (
  <div className="flex flex-col flex-wrap gap-4">
    {DELIVERIES.map((platform) => (
      <input
        key={platform}
        type="url"
        placeholder={`URL de ${platform}`}
        value={data?.[platform.toLowerCase()] ?? ""}
        onChange={(e) => onChange(platform.toLowerCase(), e.target.value)}
        className="text-lg border p-1 rounded flex-1 mr-2 w-full"
        disabled={!isEditing}
      />
    ))}
  </div>
);

export default function PagePersonalization({
  businessData,
  setBusinessData,
  isEditing,
}) {
  const [useLogo, setUseLogo] = useState(false);

  // Prevenir errores de propiedades no definidas
  useEffect(() => {
    setBusinessData((prev) => {
      const safePrev = prev || {};
      return {
        name: "",
        subtitle: "",
        logoUrl: null,
        phone: "",
        languages: safePrev.languages?.length ? safePrev.languages : ["es"],
        socialLinks: {},
        deliveryLinks: {},
        showReviewButton: false,
        theme: {
          backgroundColor: "#ffffff",
          textColor: "#000000",
          fontFamily: "Poppins",
          ...(safePrev.theme || {}),
        },
        ...safePrev,
      };
    });
  }, []);

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
      setBusinessData((prev) => ({ ...prev, name: null, logoUrl: "empty" }));
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
      const alreadySelected = prev.languages.includes(lang);
      let newLanguages;

      if (alreadySelected) {
        if (prev.languages.length === 1) {
          toast.error("Debes seleccionar al menos un idioma.");
          return prev;
        }
        newLanguages = prev.languages.filter((l) => l !== lang);
      } else {
        newLanguages = [...prev.languages, lang];
      }

      return { ...prev, languages: newLanguages };
    });
  };

  if (!businessData) return null;
  return (
    <div className={isEditing ? "" : "opacity-50 pointer-events-none"}>
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
                disabled={!isEditing}
              />
              Usar logo
            </label>
          </div>

          {useLogo ? (
            <div>
              <label className="btn btn-outline w-full">
                Seleccionar archivo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
              {businessData.logoUrl && (
                <div>
                  <img
                    src={businessData.logoUrl}
                    alt="Logo Preview"
                    className="mt-2 w-32 h-auto mx-auto"
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
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Subtítulo
          </h2>
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
          <div className="dropdown w-full">
            <div
              tabIndex={0}
              role="button"
              className="btn w-full flex justify-between"
            >
              {businessData.languages.length > 0
                ? businessData.languages
                    .map((code) => LANGUAGES[code])
                    .join(", ")
                : "Seleccionar idiomas"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full max-h-60 overflow-y-auto"
            >
              {Object.entries(LANGUAGES).map(([code, lang]) => (
                <li key={code}>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={businessData.languages.includes(code)}
                      onChange={() => handleLanguageChange(code)}
                      disabled={!isEditing}
                    />
                    {lang}
                  </label>
                </li>
              ))}
            </ul>
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
          <SocialLinksInputs
            data={businessData.socialLinks}
            onChange={handleURLChange}
            isEditing={isEditing}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Plataformas de Delivery
          </h2>
          <DeliveryLinksInputs
            data={businessData.deliveryLinks}
            onChange={handleDeliveryChange}
            isEditing={isEditing}
          />
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
    </div>
  );
}
