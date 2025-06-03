import { useState } from "react";
import DeleteProductModal from "./DeleteProductModal";

export default function ProductCard({
  product,
  isEditing,
  deleteProduct,
  firstProduct,
  lastProduct,
  setCategories,
  category,
  moveProductDown,
  moveProductUp,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialogConfirm = () => setIsOpen(true);
  const closeDialogConfirm = () => setIsOpen(false);

  const handleDelete = () => {
    deleteProduct(product.id);
    closeDialogConfirm();
  };

  const [tempName, setTempName] = useState(product.name || "");
  const [tempPrice, setTempPrice] = useState(product.price || 0);
  const [tempDescription, setTempDescription] = useState(
    product.description || ""
  );

  return (
    <div
      className="flex flex-row mt-2
    "
    >
      {isEditing && (
        <div className="flex flex-col justify-center items-center gap-2">
          {product !== firstProduct && (
            <button
              onClick={() => moveProductUp(category.id, product.id)}
              aria-label="Move product up"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-neutral-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                />
              </svg>
            </button>
          )}

          {product !== lastProduct && (
            <button
              onClick={() => moveProductDown(category.id, product.id)}
              aria-label="Move product down"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-neutral-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                />
              </svg>
            </button>
          )}
        </div>
      )}
      <div className="w-full bg-[#121a26] text-white rounded-xl shadow-sm p-4">
        <div className="flex flex-row justify-between items-center">
          {isEditing ? (
            <input
              type="text"
              className="text-xl font-semibold bg-transparent border-b border-[#2a2a2a] focus:border-neutral-500 focus:outline-none w-full mr-4 pb-1 placeholder:text-neutral-500"
              value={tempName}
              placeholder="Nombre del producto"
              onChange={(e) => setTempName(e.target.value)}
              onBlur={() => {
                setCategories((prev) =>
                  prev.map((c) =>
                    c.id === category.id
                      ? {
                          ...c,
                          products: c.products.map((p) =>
                            p.id === product.id ? { ...p, name: tempName } : p
                          ),
                        }
                      : c
                  )
                );
              }}
            />
          ) : (
            <h2 className="text-xl font-semibold">{product.name}</h2>
          )}

          {isEditing ? (
            <input
              type="number"
              className="text-neutral-400 font-semibold text-xl bg-transparent border-b border-[#2a2a2a] focus:border-neutral-500 focus:outline-none w-24 text-right pb-1 placeholder:text-neutral-500"
              value={tempPrice}
              placeholder="Precio"
              onChange={(e) => setTempPrice(e.target.value)}
              onBlur={() => {
                setCategories((prev) =>
                  prev.map((c) =>
                    c.id === category.id
                      ? {
                          ...c,
                          products: c.products.map((p) =>
                            p.id === product.id ? { ...p, price: tempPrice } : p
                          ),
                        }
                      : c
                  )
                );
              }}
            />
          ) : (
            <p className="text-neutral-400 font-semibold text-xl">
              {product.price} €
            </p>
          )}
        </div>

        {isEditing ? (
          <textarea
            className="mt-3 w-full bg-transparent border border-[#2a2a2a] rounded-md p-3 text-neutral-200 placeholder:text-neutral-500 focus:border-neutral-500 focus:outline-none resize-none"
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
            onBlur={() => {
              setCategories((prev) =>
                prev.map((c) =>
                  c.id === category.id
                    ? {
                        ...c,
                        products: c.products.map((p) =>
                          p.id === product.id
                            ? { ...p, description: tempDescription }
                            : p
                        ),
                      }
                    : c
                )
              );
            }}
            placeholder="Descripción del producto"
            rows={3}
          />
        ) : (
          <p className="text-neutral-300 text-left text-sm mt-3">
            {product.description}
          </p>
        )}
      </div>
      {isEditing && (
        <button
          type="button"
          className="self-center ml-4 rounded-md bg-neutral-800 hover:bg-neutral-700 p-2"
          onClick={openDialogConfirm}
          aria-label={`Eliminar producto ${product.name}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-neutral-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      )}
      <DeleteProductModal
        open={isOpen}
        onClose={closeDialogConfirm}
        onConfirm={handleDelete}
        productName={product.name}
      />
    </div>
  );
}
