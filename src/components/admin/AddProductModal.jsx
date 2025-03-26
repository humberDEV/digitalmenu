"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

  const currency = "USD";

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
    console.log("Categoría seleccionada:", value);
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
    console.log("Agregando producto...");
    console.log("isFormValid:", isFormValid());
    if (!isFormValid()) return;

    const product = {
      id: uuidv4(),
      name: productName,
      price: parseFloat(productPrice),
      description: productDescription,
      categoryId: productCategory,
    };

    addProduct(product);
    console.log("Producto agregado:", product);

    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductCategory("");
    setErrors({});
    onClose();
  };

  return (
    <dialog
      id="addProductModal"
      className={`modal ${open ? "modal-open" : ""}`}
      onClose={onClose}
    >
      <div className="modal-box bg-white p-6 rounded-lg shadow-lg">
        <h1 className="font-bold text-2xl mb-4 text-gray-800">
          Agregar Producto
        </h1>

        {/* Nombre del producto */}
        <div className="w-full mt-4">
          <label
            htmlFor="productName"
            className="text-sm font-medium text-gray-700 mb-1 block"
          >
            Nombre del producto
          </label>
          <input
            id="productName"
            type="text"
            className="input input-bordered w-full"
            value={productName}
            onChange={handleProductNameChange}
            placeholder="Ej: Café Espresso"
            autoFocus
          />
          {errors.productName && (
            <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
          )}
        </div>

        {/* Selección de categoría */}
        <div className="w-full mt-4">
          <label
            htmlFor="productCategory"
            className="text-sm font-medium text-gray-700 mb-1 block"
          >
            Categoría
          </label>
          <select
            id="productCategory"
            className="select select-bordered w-full"
            value={productCategory}
            onChange={handleProductCategoryChange}
            disabled={categoryList.length === 0}
          >
            <option value="">Selecciona una categoría</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.productCategory && (
            <p className="text-red-500 text-sm mt-1">
              {errors.productCategory}
            </p>
          )}
        </div>

        {/* Precio del producto */}
        <div className="w-full mt-4">
          <label
            htmlFor="productPrice"
            className="text-sm font-medium text-gray-700 mb-1 block"
          >
            Precio del producto
          </label>
          <div className="flex items-center gap-2">
            <input
              id="productPrice"
              type="number"
              className="input input-bordered w-1/2"
              value={productPrice}
              onChange={handleProductPriceChange}
              min="0"
            />
            <span className="text-sm text-gray-500">{currency}</span>
          </div>
          {errors.productPrice && (
            <p className="text-red-500 text-sm mt-1">{errors.productPrice}</p>
          )}
        </div>

        {/* Descripción del producto */}
        <div className="w-full mt-4">
          <label
            htmlFor="productDescription"
            className="text-sm font-medium text-gray-700 mb-1 block"
          >
            Descripción del producto
          </label>
          <textarea
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
          <button onClick={onClose} className="btn btn-error">
            Cerrar
          </button>
          <button
            className="btn btn-success"
            onClick={handleAddProduct}
            disabled={!isFormValid() || categoryList.length === 0}
          >
            Agregar
          </button>
        </div>
      </div>
    </dialog>
  );
}
