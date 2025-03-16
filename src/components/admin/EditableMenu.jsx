"use client";

import ProductCard from "./ProductCard";
import "@/styles/admin/EditableMenu.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AddCategoryModal from "./AddCategoryModal";
import AddProductModal from "./AddProductModal";
import DeleteProductModal from "./DeleteProductModal";
import useMenuLogic from "./menuLogics";

export default function EditableMenu({ isEditing }) {
  const {
    categories,
    addCategoryModal,
    setAddCategoryModal,
    addProductModal,
    setAddProductModal,
    deleteCategoryModal,
    setDeleteCategoryModal,
    categoryToDelete,
    openDeleteCategoryModal,
    handleDeleteCategory,
    addCategory,
    addProduct,
    deleteProduct,
    moveCategoryDown,
    moveCategoryUp,
  } = useMenuLogic();

  const DroppableCategory = ({
    category,
    children,
    onDeleteCategory,
    isEditing,
  }) => {
    return (
      <div className="p-2 mt-10">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">{category.name}</h2>
          {isEditing && (
            <button
              className="btn-xs"
              onClick={() => onDeleteCategory(category)}
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
            </button>
          )}
        </div>

        <div className="flex flex-row">
          {isEditing && (
            <div className="flex flex-col justify-center items-center mr-2 gap-2">
              <div
                className="btn btn-sm w-10 h-10"
                onClick={() => moveCategoryUp(category.id)}
                disabled={category === categories[0]}
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
                onClick={() => moveCategoryDown(category.id)}
                disabled={category === categories[categories.length - 1]}
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
          <div className="flex-1 border border-gray-300 p-2 mt-2 ml-6">
            <div className="flex flex-col gap-2">{children}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {isEditing && (
          <div className="flex gap-2 mt-4">
            <button
              className="btn btn-neutral"
              onClick={() => setAddCategoryModal(true)}
            >
              + Agregar categoría
            </button>
            <button
              className="btn btn-neutral"
              onClick={() => setAddProductModal(true)}
            >
              + Agregar producto
            </button>
          </div>
        )}

        {categories.map((category) => (
          <DroppableCategory
            key={category.id}
            category={category}
            onDeleteCategory={openDeleteCategoryModal}
            isEditing={isEditing}
          >
            {category.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isEditing={isEditing}
                deleteProduct={deleteProduct}
                firstProduct={category.products[0]}
                lastProduct={category.products[category.products.length - 1]}
              />
            ))}
          </DroppableCategory>
        ))}
      </div>

      <AddCategoryModal
        open={addCategoryModal}
        addCategory={addCategory}
        onClose={() => setAddCategoryModal(false)}
      />
      <AddProductModal
        open={addProductModal}
        categoryList={categories}
        addProduct={addProduct}
        onClose={() => setAddProductModal(false)}
      />
      <DeleteProductModal
        open={deleteCategoryModal}
        onClose={() => setDeleteCategoryModal(false)}
        onConfirm={handleDeleteCategory}
        productName={categoryToDelete?.name}
        isCategoryModal={true}
      />
    </DndProvider>
  );
}
