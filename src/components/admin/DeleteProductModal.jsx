"use client";

export default function DeleteProductModal({
  open,
  onClose,
  onConfirm,
  productName,
  isCategoryModal = false,
}) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-2xl w-full max-w-lg text-white">
            <h1 className="font-bold text-2xl mb-4">
              ¿Estás seguro de eliminar{" "}
              {isCategoryModal ? "la categoría" : "el producto"}
              <span className="text-red-500"> {productName}</span>?
            </h1>
            {isCategoryModal && (
              <p className="text-sm text-white/70 mt-2">
                Todos los productos de esta categoría también serán eliminados.
              </p>
            )}
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={onClose}
                className="bg-white/10 text-white/70 hover:bg-white/20 transition-all px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="bg-red-600 hover:bg-red-700 text-white transition-all px-4 py-2 rounded-lg"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
