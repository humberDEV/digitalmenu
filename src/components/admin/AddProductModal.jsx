"use client";

import { useState } from "react";

export default function AddProductModal({
  isOpen,
  categoryList,
  onClose,
  addProduct,
}) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("");

  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handleProductDescriptionChange = (e) =>
    setProductDescription(e.target.value);
  const handleProductPriceChange = (e) => setProductPrice(e.target.value);
  const handleProductCategoryChange = (e) => setProductCategory(e.target.value);

  const currency = "USD";

  const handleAddProduct = () => {
    addProduct({
      id: Date.now(),
      name: productName,
      price: productPrice,
      description: productDescription,
      categoryId: parseInt(productCategory),
    });
    onClose();
  };

  return (
    <dialog
      id="addProductModal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
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
            placeholder="Ej: Café Espresso"
            value={productName}
            onChange={handleProductNameChange}
            autoFocus
          />
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
          >
            <option value="">Selecciona una categoría</option>
            {categoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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
            />
            <span className="text-sm text-gray-500">{currency}</span>
          </div>
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
            placeholder="Ej: Café negro fuerte con un toque de caramelo"
            value={productDescription}
            onChange={handleProductDescriptionChange}
          />
        </div>

        {/* Botones */}
        <div className="modal-action mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="btn btn-error">
            Cerrar
          </button>
          <button className="btn btn-success" onClick={handleAddProduct}>
            Agregar
          </button>
        </div>
      </div>
    </dialog>
  );
}
