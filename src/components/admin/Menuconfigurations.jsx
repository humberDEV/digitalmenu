"use client";

import { useState } from "react";

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

export default function MenuConfigurations({
  businessData,
  setBusinessData,
  themeConfig,
  setThemeConfig,
  isEditing,
  tab,
  setTab,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setThemeConfig({ ...themeConfig, [name]: value });
  };

  return (
    <div className="tabs tabs-lift tabs-lg">
      {/* Tab para la Personalización */}
      <input
        type="radio"
        name="my_tabs_3"
        className="tab"
        aria-label="Personalizar menú"
        defaultChecked
        disabled={isEditing && tab !== 0}
        onClick={() => setTab(0)}
      />
      <div className="tab-content bg-base-100 border-base-300 p-6">
        <div className="space-y-14">
          {/* Título Cambiar tamaños */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Cambiar tamaños
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {/* Selector de tamaño de título de categoría */}
              <RangeSelector
                label="Tamaño Título Categoría"
                name="categoryTitleSize"
                value={themeConfig.categoryTitleSize}
                min={12}
                max={60}
                step={1}
                onChange={handleChange}
                isEditing={isEditing}
              />

              {/* Selector de tamaño de título de producto */}
              <RangeSelector
                label="Tamaño Título Producto"
                name="productTitleSize"
                value={themeConfig.productTitleSize}
                min={12}
                max={60}
                step={1}
                onChange={handleChange}
                isEditing={isEditing}
              />

              {/* Selector de tamaño de precio de producto */}
              <RangeSelector
                label="Tamaño Precio Producto"
                name="productPriceSize"
                value={themeConfig.productPriceSize}
                min={12}
                max={60}
                step={1}
                onChange={handleChange}
                isEditing={isEditing}
              />

              {/* Selector de tamaño de descripción de producto */}
              <RangeSelector
                label="Tamaño Descripción Producto"
                name="productDescriptionSize"
                value={themeConfig.productDescriptionSize}
                min={12}
                max={60}
                step={1}
                onChange={handleChange}
                isEditing={isEditing}
              />
            </div>
          </div>

          {/* Título Cambiar colores */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Cambiar colores
            </h2>
            <div className="flex flex-wrap gap-6">
              {/* Color de fondo */}
              <div className="w-full sm:w-auto flex-1">
                <ColorPicker
                  label="Fondo"
                  color={themeConfig.backgroundColor}
                  setColor={(color) =>
                    setThemeConfig({ ...themeConfig, backgroundColor: color })
                  }
                  isEditing={isEditing}
                />
              </div>

              {/* Color Título Categoría */}
              <div className="w-full sm:w-auto flex-1">
                <ColorPicker
                  label="Título Categoría"
                  color={themeConfig.categoryTitleColor}
                  setColor={(color) =>
                    setThemeConfig({
                      ...themeConfig,
                      categoryTitleColor: color,
                    })
                  }
                  isEditing={isEditing}
                />
              </div>

              {/* Color Título Producto */}
              <div className="w-full sm:w-auto flex-1">
                <ColorPicker
                  label="Título Producto"
                  color={themeConfig.productTitleColor}
                  setColor={(color) =>
                    setThemeConfig({ ...themeConfig, productTitleColor: color })
                  }
                  isEditing={isEditing}
                />
              </div>

              {/* Color Precio Producto */}
              <div className="w-full sm:w-auto flex-1">
                <ColorPicker
                  label="Precios"
                  color={themeConfig.productPriceColor}
                  setColor={(color) =>
                    setThemeConfig({ ...themeConfig, productPriceColor: color })
                  }
                  isEditing={isEditing}
                />
              </div>

              {/* Color Descripción Producto */}
              <div className="w-full sm:w-auto flex-1">
                <ColorPicker
                  label="Descripción"
                  color={themeConfig.productDescriptionColor}
                  setColor={(color) =>
                    setThemeConfig({
                      ...themeConfig,
                      productDescriptionColor: color,
                    })
                  }
                  isEditing={isEditing}
                />
              </div>
            </div>
          </div>

          {/* Título Cambiar fuente */}
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
      </div>

      {/* Tab para Datos de la Empresa */}
      <input
        type="radio"
        name="my_tabs_3"
        className="tab"
        aria-label="Personalizar web"
        disabled={isEditing && tab !== 1}
        onClick={() => setTab(1)}
      />
      <div className="tab-content bg-base-100 border-base-300 p-6">
        {/* contenido */}
      </div>
    </div>
  );
}
