"use client";

import { useState } from "react";

export default function AddCategoryModal({ isOpen, onClose, addCategory }) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryPrice, setCategoryPrice] = useState(0);

  const handleCategoryNameChange = (e) => setCategoryName(e.target.value);
  const handleCategoryDescriptionChange = (e) =>
    setCategoryDescription(e.target.value);
  const handleCategoryPriceChange = (e) => setCategoryPrice(e.target.value);

  const currency = "USD";

  const handleAddCategory = () => {
    addCategory({
      id: Date.now(),
      name: categoryName,
      price: categoryPrice,
      description: categoryDescription,
    });
    onClose();
  };

  return (
    <dialog
      id="addCategoryModal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
      onClose={onClose}
    >
      <div className="modal-box bg-white p-6 rounded-lg shadow-lg">
        <h1 className="font-bold text-2xl mb-4 text-gray-800">
          Agregar categoría
        </h1>

        {/* Nombre de la categoría */}
        <div className="w-full mt-4">
          <label
            htmlFor="categoryName"
            className="text-sm font-medium text-gray-700 mb-1 block"
          >
            Nombre de la categoría
          </label>
          <input
            id="categoryName"
            type="text"
            className="input input-bordered w-full"
            placeholder="Ej: Hamburguesas"
            value={categoryName}
            onChange={handleCategoryNameChange}
            autoFocus
          />
        </div>

        {/* Botones */}
        <div className="modal-action mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="btn btn-error">
            Cerrar
          </button>
          <button className="btn btn-success" onClick={handleAddCategory}>
            Agregar
          </button>
        </div>
      </div>
    </dialog>
  );
}
