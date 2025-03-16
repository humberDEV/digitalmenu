"use client";

import { useState } from "react";

export default function AddCategoryModal({ open, onClose, addCategory }) {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");

  const handleCategoryNameChange = (e) => {
    const value = e.target.value;
    setCategoryName(value);

    if (value.trim() === "") {
      setError("El nombre de la categoría es obligatorio.");
    } else if (value.length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
    } else {
      setError("");
    }
  };

  const handleAddCategory = () => {
    if (categoryName.trim() && categoryName.length >= 3) {
      addCategory({
        id: Date.now(),
        name: categoryName,
      });

      setCategoryName("");
      onClose();
    }
  };

  return (
    <dialog
      id="addCategoryModal"
      className={`modal ${open ? "modal-open" : ""}`}
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
            className={`input input-bordered w-full ${
              error ? "input-error" : ""
            }`}
            placeholder="Ej: Hamburguesas"
            value={categoryName}
            onChange={handleCategoryNameChange}
            autoFocus
          />
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>

        {/* Botones */}
        <div className="modal-action mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="btn btn-error">
            Cerrar
          </button>
          <button
            className="btn btn-success"
            onClick={handleAddCategory}
            disabled={!categoryName.trim() || categoryName.length < 3}
          >
            Agregar
          </button>
        </div>
      </div>
    </dialog>
  );
}
