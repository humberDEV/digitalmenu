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
    <div className="flex flex-row">
      {isEditing && (
        <div className="flex flex-col justify-center items-center mr-2 gap-2">
          <div
            className="btn btn-sm w-10 h-10"
            disabled={product === firstProduct}
            onClick={() => moveProductUp(category.id, product.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          </div>
          <div
            className="btn btn-sm w-10 h-10"
            disabled={product === lastProduct}
            onClick={() => moveProductDown(category.id, product.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </div>
        </div>
      )}
      <div className="flex-1 border border-gray-300 rounded-md p-4 mt-2 mr-2 shadow-sm bg-gray-100">
        <div className="flex flex-row justify-between">
          {isEditing ? (
            <input
              type="text"
              className="text-xl font-bold border p-1 rounded flex-1 mr-2"
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
            <h2 className="text-xl font-bold">{product.name}</h2>
          )}

          {isEditing ? (
            <input
              type="number"
              className="text-gray-500 font-bold text-xl border p-1 rounded w-24"
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
            <p className="text-gray-500 font-bold text-xl">{product.price}€</p>
          )}
        </div>

        {isEditing ? (
          <textarea
            className="text-gray-800 border p-1 rounded w-full mt-2"
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
          />
        ) : (
          <p className="text-gray-800">{product.description}</p>
        )}
      </div>
      {isEditing && (
        <div
          className="items-center self-center justify-center hover:cursor-pointer"
          onClick={openDialogConfirm}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
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
