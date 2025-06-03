"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

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

  const isValid = categoryName.trim().length >= 3;

  const handleAddCategory = () => {
    if (!isValid) return;

    addCategory({
      id: uuidv4(),
      name: categoryName,
    });

    setCategoryName("");
    setError("");
    onClose();
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-2xl w-full max-w-md">
            <h1 className="font-bold text-2xl mb-4 text-white">
              Agregar Categoría
            </h1>

            <div className="w-full mt-4">
              <Label
                htmlFor="categoryName"
                className="text-sm font-medium text-white/80 mb-1 block"
              >
                Nombre de la categoría
              </Label>
              <Input
                id="categoryName"
                type="text"
                className="input input-bordered w-full"
                placeholder="Ej: Bebidas"
                value={categoryName}
                onChange={handleCategoryNameChange}
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="modal-action mt-4 flex justify-end gap-2">
              <Button variant="ghost" onClick={onClose}>
                Cerrar
              </Button>
              <Button
                onClick={handleAddCategory}
                className={`transition-all ${
                  isValid
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-white/10 text-white/40 cursor-not-allowed"
                }`}
                disabled={!isValid}
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
