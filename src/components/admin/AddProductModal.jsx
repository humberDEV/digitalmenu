"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddProductModal({
  open,
  categoryList,
  onClose,
  addProduct,
}) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [errors, setErrors] = useState({});

  const currency = "€";

  // Función para validar un solo campo
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "productName":
        if (!value.trim()) error = "El nombre es obligatorio.";
        break;
      case "productCategory":
        if (!value || value === "") error = "Selecciona una categoría válida.";
        break;
      case "productPrice":
        if (!value || isNaN(value) || parseFloat(value) <= 0) {
          error = "Ingresa un precio válido.";
        }
        break;
      case "productDescription":
        if (!value.trim()) error = "La descripción es obligatoria.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Manejadores de cambio con validación en tiempo real
  const handleProductNameChange = (e) => {
    const value = e.target.value;
    setProductName(value);
    validateField("productName", value);
  };

  const handleProductDescriptionChange = (e) => {
    const value = e.target.value;
    setProductDescription(value);
    validateField("productDescription", value);
  };

  const handleProductPriceChange = (e) => {
    const value = e.target.value;
    setProductPrice(value);
    validateField("productPrice", value);
  };

  const handleProductCategoryChange = (e) => {
    const value = e.target.value;
    setProductCategory(value);
    validateField("productCategory", value);
  };

  // Verifica si hay errores
  const isFormValid = () => {
    return (
      Object.values(errors).every((error) => error === "") &&
      productName.trim() &&
      productDescription.trim() &&
      productCategory &&
      productPrice &&
      !isNaN(productPrice) &&
      parseFloat(productPrice) > 0
    );
  };

  const handleAddProduct = () => {
    if (!isFormValid()) return;

    const product = {
      id: uuidv4(),
      name: productName,
      price: parseFloat(productPrice),
      description: productDescription,
      categoryId: productCategory,
    };

    addProduct(product);

    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductCategory("");
    setErrors({});
    onClose();
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-2xl w-full max-w-lg">
            <h1 className="font-bold text-2xl mb-4 text-white">
              Agregar Producto
            </h1>

            {/* Nombre del producto */}
            <div className="w-full mt-4">
              <Label
                htmlFor="productName"
                className="text-sm font-medium text-white/80 mb-1 block"
              >
                Nombre del producto
              </Label>
              <Input
                id="productName"
                type="text"
                className="input input-bordered w-full"
                value={productName}
                onChange={handleProductNameChange}
                placeholder="Ej: Café Espresso"
                autoFocus
              />
              {errors.productName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productName}
                </p>
              )}
            </div>

            {/* Selección de categoría */}
            <div className="w-full mt-4">
              <Label
                htmlFor="productCategory"
                className="text-sm font-medium text-white/80 mb-1 block"
              >
                Categoría
              </Label>
              <Select
                value={productCategory}
                onValueChange={(value) => {
                  setProductCategory(value);
                  validateField("productCategory", value);
                }}
                disabled={categoryList.length === 0}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categoryList.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.productCategory && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productCategory}
                </p>
              )}
            </div>

            {/* Precio del producto */}
            <div className="w-full mt-4">
              <Label
                htmlFor="productPrice"
                className="text-sm font-medium text-white/80 mb-1 block"
              >
                Precio del producto
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="productPrice"
                  type="number"
                  className="input input-bordered w-1/2"
                  value={productPrice}
                  onChange={handleProductPriceChange}
                  min="0"
                />
                <span className="text-sm text-white/60">{currency}</span>
              </div>
              {errors.productPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productPrice}
                </p>
              )}
            </div>

            {/* Descripción del producto */}
            <div className="w-full mt-4">
              <Label
                htmlFor="productDescription"
                className="text-sm font-medium text-white/80 mb-1 block"
              >
                Descripción del producto
              </Label>
              <Textarea
                id="productDescription"
                className="input input-bordered w-full h-24"
                value={productDescription}
                onChange={handleProductDescriptionChange}
                placeholder="Ej: Café negro fuerte con un toque de caramelo"
              />
              {errors.productDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productDescription}
                </p>
              )}
            </div>

            {/* Botones */}
            <div className="modal-action mt-4 flex justify-end gap-2">
              <Button variant="ghost" onClick={onClose}>
                Cerrar
              </Button>
              <Button
                onClick={handleAddProduct}
                className={`transition-all ${
                  isFormValid() && categoryList.length > 0
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-white/10 text-white/40 cursor-not-allowed"
                }`}
                disabled={!isFormValid() || categoryList.length === 0}
              >
                Agregar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
