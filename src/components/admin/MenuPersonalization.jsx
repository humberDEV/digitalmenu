"use client";

import ColorSelector from "./ui/ColorSelector";
import FontSelector from "./ui/FontSelector";

// Componente para el selector de rango
const RangeSelector = ({
  label,
  name,
  value,
  min,
  max,
  step,
  onChange,
  isEditing,
}) => (
  <div className="form-control">
    <div className="flex justify-between items-center mb-4">
      <label className="label">
        <span className="label-text text-xs">{label}</span>
      </label>
      <span>{value}px</span>
    </div>
    <input
      disabled={!isEditing}
      type="range"
      name={name}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className="range range-xs range-neutral w-full [--range-fill:0]"
    />
  </div>
);

// Componente para el selector de color
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

export default function MenuPersonalization({
  themeConfig,
  setThemeConfig,
  isEditing,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setThemeConfig({ ...themeConfig, [name]: value });
  };

  return (
    <div className="space-y-14">
      {/* Personalización de tamaños */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Cambiar tamaños
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {[
            {
              label: "Tamaño Título Categoría",
              name: "categoryTitleSize",
              value: themeConfig.categoryTitleSize,
            },
            {
              label: "Tamaño Título Producto",
              name: "productTitleSize",
              value: themeConfig.productTitleSize,
            },
            {
              label: "Tamaño Precio Producto",
              name: "productPriceSize",
              value: themeConfig.productPriceSize,
            },
            {
              label: "Tamaño Descripción Producto",
              name: "productDescriptionSize",
              value: themeConfig.productDescriptionSize,
            },
          ].map(({ label, name, value }) => (
            <RangeSelector
              key={name}
              label={label}
              name={name}
              value={value}
              min={12}
              max={60}
              step={1}
              onChange={handleChange}
              isEditing={isEditing}
            />
          ))}
        </div>
      </div>

      {/* Personalización de colores */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Cambiar colores
        </h2>
        <div className="flex flex-wrap gap-6">
          {[
            {
              label: "Fondo",
              name: "backgroundColor",
              color: themeConfig.backgroundColor,
            },
            {
              label: "Título Categoría",
              name: "categoryTitleColor",
              color: themeConfig.categoryTitleColor,
            },
            {
              label: "Título Producto",
              name: "productTitleColor",
              color: themeConfig.productTitleColor,
            },
            {
              label: "Precios",
              name: "productPriceColor",
              color: themeConfig.productPriceColor,
            },
            {
              label: "Descripción",
              name: "productDescriptionColor",
              color: themeConfig.productDescriptionColor,
            },
          ].map(({ label, name, color }) => (
            <ColorPicker
              key={name}
              label={label}
              color={color}
              setColor={(newColor) =>
                setThemeConfig({ ...themeConfig, [name]: newColor })
              }
              isEditing={isEditing}
            />
          ))}
        </div>
      </div>

      {/* Personalización de fuente */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Cambiar fuente
        </h2>
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Seleccionar Fuente</span>
          </label>
          <FontSelector
            font={themeConfig.fontFamily}
            setFont={(font) =>
              setThemeConfig({ ...themeConfig, fontFamily: font })
            }
            isEditing={isEditing}
          />
        </div>
      </div>
    </div>
  );
}
