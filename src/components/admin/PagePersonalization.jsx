"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

import ColorSelector from "./ui/ColorSelector";
import FontSelector from "./ui/FontSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

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
    <Label className="justify-center flex text-sm text-center">{label}</Label>
    <div className="flex justify-center gap-4">
      <ColorSelector color={color} setColor={setColor} isEditing={isEditing} />
    </div>
  </div>
);

const SocialLinksInputs = ({ data, onChange, isEditing }) => (
  <div className="flex flex-col flex-wrap gap-4">
    {SOCIAL_MEDIA.map((platform) => (
      <Input
        key={platform}
        type="url"
        placeholder={`URL de ${platform}`}
        value={data?.[platform.toLowerCase()] ?? ""}
        onChange={(e) => onChange(platform.toLowerCase(), e.target.value)}
        disabled={!isEditing}
        className="w-full"
      />
    ))}
  </div>
);

const DeliveryLinksInputs = ({ data, onChange, isEditing }) => (
  <div className="flex flex-col flex-wrap gap-4">
    {DELIVERIES.map((platform) => (
      <Input
        key={platform}
        type="url"
        placeholder={`URL de ${platform}`}
        value={data?.[platform.toLowerCase().replace(/\s+/g, "")] ?? ""}
        onChange={(e) =>
          onChange(platform.toLowerCase().replace(/\s+/g, ""), e.target.value)
        }
        disabled={!isEditing}
        className="w-full"
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

  const handleToggleLogo = (checked) => {
    setUseLogo(checked);
    if (!checked) {
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
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bloque 1: Título o Logo + Subtítulo */}
        <div className="space-y-6">
          <div>
            <h2 className="text-white/90 font-semibold text-base tracking-tight mb-4">
              Título o logo
            </h2>
            <div className="mb-4 flex items-center justify-between">
              <Label htmlFor="logo" className="text-white/80 text-sm">
                Usar logo
              </Label>
              <Switch
                id="logo"
                checked={useLogo}
                onCheckedChange={handleToggleLogo}
                disabled={!isEditing}
                className="ml-auto"
              />
            </div>

            {useLogo ? (
              <div>
                <label className="w-full cursor-pointer text-white/80 px-4 py-2 text-center hover:underline transition block">
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
                <Input
                  type="text"
                  value={businessData.name || ""}
                  onChange={handleTitleChange}
                  placeholder="Escribe el título"
                  disabled={!isEditing}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-white/90 font-semibold text-base tracking-tight mb-4">
              Subtítulo
            </h2>
            <Input
              type="text"
              name="subtitle"
              placeholder="Subtítulo"
              value={businessData.subtitle || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full"
            />
          </div>
        </div>

        {/* Bloque 2: Colores + Fuente */}
        <div className="space-y-6">
          <div>
            <h2 className="text-white/90 font-semibold text-base tracking-tight mb-4">
              Colores
            </h2>
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
            <h2 className="text-white/90 font-semibold text-base tracking-tight mb-4">
              Fuente
            </h2>
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
        </div>

        {/* Bloque 3: Idiomas + Botón de reseña */}
        <div className="space-y-6">
          <div>
            <h2 className="text-white/90 font-semibold text-base tracking-tight mb-4">
              Idiomas
            </h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between px-4 py-2 rounded-xl bg-[#1c1c1f] border border-white/10 text-sm text-white/80 hover:bg-background/50 transition-all"
                  disabled={!isEditing}
                >
                  {businessData.languages.length > 0
                    ? businessData.languages
                        .map((code) => LANGUAGES[code])
                        .join(", ")
                    : "Seleccionar idiomas"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2 opacity-70"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="w-64 p-3 rounded-xl border border-white/10 bg-[#1c1c1f] shadow-xl space-y-1 max-h-60 overflow-y-auto"
              >
                {Object.entries(LANGUAGES).map(([code, lang]) => (
                  <div
                    key={code}
                    role="option"
                    onClick={() => handleLanguageChange(code)}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm cursor-pointer transition-all ${
                      businessData.languages.includes(code)
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5"
                    }`}
                  >
                    <Checkbox checked={businessData.languages.includes(code)} />
                    <span>{lang}</span>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-white/90 font-semibold text-base tracking-tight mb-4">
              Botón de pedir reseñas en Google
            </h2>
            <Button
              type="button"
              variant="outline"
              className={`ml-auto text-sm px-4 py-2 rounded-xl border transition-all ${
                businessData.showReviewButton
                  ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                  : "bg-background/60 text-white/50 border-white/10 hover:bg-background/40"
              }`}
              onClick={() => handleToggle("showReviewButton")}
              disabled={!isEditing}
            >
              {businessData.showReviewButton ? "Activado" : "Desactivado"}
            </Button>
          </div>

          <div className="mt-6">
            <h2 className="text-white/90 font-semibold text-base tracking-tight mb-4">
              Número telefónico
            </h2>
            <Input
              type="tel"
              name="phone"
              placeholder="Número telefónico"
              value={businessData.phone || ""}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full"
            />
          </div>
        </div>

        {/* Bloque 4: Redes Sociales + Plataformas Delivery */}
        <div className="space-y-6">
          <Accordion type="single" collapsible defaultValue="" className="">
            <AccordionItem value="social" defaultValue="">
              <AccordionTrigger className="text-white/80 font-medium text-sm hover:underline transition">
                Redes Sociales
              </AccordionTrigger>
              <AccordionContent>
                <SocialLinksInputs
                  data={businessData.socialLinks}
                  onChange={handleURLChange}
                  isEditing={isEditing}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible defaultValue="" className="">
            <AccordionItem value="delivery" defaultValue="">
              <AccordionTrigger className="text-white/80 font-medium text-sm hover:underline transition">
                Plataformas de Delivery
              </AccordionTrigger>
              <AccordionContent>
                <DeliveryLinksInputs
                  data={businessData.deliveryLinks}
                  onChange={handleDeliveryChange}
                  isEditing={isEditing}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>{" "}
      {/* End of grid */}
    </div>
  );
}
