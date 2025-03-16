"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function DeleteProductModal({
  open,
  onClose,
  onConfirm,
  productName,
  isCategoryModal = false,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    open && (
      <dialog className="modal modal-open">
        <div className="modal-box">
          {/* Título del modal */}
          <h2 className="font-bold text-lg text-gray-800">
            ¿Estás seguro de eliminar{" "}
            {isCategoryModal ? "la categoría" : "el producto"}
            <span className="text-red-500"> {productName}</span>?
          </h2>
          {isCategoryModal && (
            <p className="text-gray-600">
              Todos los productos de esta categoría también serán eliminados.
            </p>
          )}

          {/* Botones */}
          <div className="modal-action">
            <button className="btn btn-outline" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-error" onClick={onConfirm}>
              Eliminar
            </button>
          </div>
        </div>
      </dialog>
    ),
    document.body
  );
}
