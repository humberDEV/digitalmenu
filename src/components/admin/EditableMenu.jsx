"use client";

import "@/styles/admin/scroll.css";

import { Reorder } from "framer-motion";
import ProductCard from "./ProductCard";
import "@/styles/admin/EditableMenu.css";

import AddCategoryModal from "./AddCategoryModal";
import AddProductModal from "./AddProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function EditableMenu({
  isEditing,
  categories,
  setCategories,
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
  moveProductDown,
  moveProductUp,
  handleReorderCategory,
  handleReorderProduct,
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  // State to track the last added product for scroll/zoom
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [selectedCategoryScrollId, setSelectedCategoryScrollId] =
    useState(null);
  const handleAddCategory = (newCategory) => {
    addCategory(newCategory);
    setSelectedCategoryScrollId(newCategory.id);
  };

  // Handler to wrap addProduct and set selectedProductId
  const handleAddProduct = (newProduct) => {
    addProduct(newProduct);
    setSelectedProductId(newProduct.id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 text-white space-y-8 overflow-y-auto no-scrollbar pb-24 relative">
      {isEditing && (
        <div className="flex flex-wrap gap-3 mt-2 sm:mt-6 sticky top-0 z-50 bg-[#0b0f19]">
          <Button
            variant="ghost"
            className="bg-glass backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition px-4 py-2 rounded-xl"
            onClick={() => setAddCategoryModal(true)}
          >
            + Agregar Categoría
          </Button>
          <Button
            variant="ghost"
            className="bg-glass backdrop-blur-md border border-white/10 text-white hover:bg-white/10 transition px-4 py-2 rounded-xl"
            onClick={() => setAddProductModal(true)}
          >
            + Agregar Producto
          </Button>
        </div>
      )}

      {/* Editable Categories */}
      {isEditing ? (
        <Reorder.Group
          axis="y"
          values={categories}
          onReorder={handleReorderCategory}
          className="space-y-8"
        >
          {categories.map((category) => (
            <Reorder.Item
              key={category.id}
              value={category}
              dragListener={false}
            >
              <div
                id={`category-${category.id}`}
                className="rounded-2xl border border-white/10 bg-[#0b0f19]/60 space-y-5 border-t border-white/10 pt-4 px-4 sm:px-6 py-4"
              >
                <div className="flex justify-between items-center">
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full rounded-xl bg-white/5 text-white/90 text-xl font-semibold border border-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 px-3 py-2"
                      value={category.name}
                      placeholder="Nombre de la categoría"
                      onChange={(e) => {
                        setCategories((prev) =>
                          prev.map((cat) =>
                            cat.id === category.id
                              ? { ...cat, name: e.target.value }
                              : cat
                          )
                        );
                      }}
                    />
                  ) : (
                    <h2 className="text-xl font-bold text-white/90 tracking-tight py-1">
                      {category.name}
                    </h2>
                  )}
                  {isEditing && (
                    <button
                      className="p-2 rounded-full"
                      onClick={() => openDeleteCategoryModal(category)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="red"
                        className="w-5 h-5"
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

                <div className="flex mt-4 gap-4 divide-white/10">
                  {isEditing && (
                    <div className="flex flex-col items-center gap-3">
                      {category !== categories[0] && (
                        <button
                          className="text-neutral-400 hover:text-white"
                          onClick={() => {
                            moveCategoryUp(category.id, "up");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                            />
                          </svg>
                        </button>
                      )}

                      {category !== categories[categories.length - 1] && (
                        <button
                          className="text-neutral-400 hover:text-white"
                          onClick={() => moveCategoryDown(category.id, "down")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
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

                  <div className="rounded-xl bg-[#0b0f19]/60 p-4 divide-y divide-white/10 flex-1 space-y-4">
                    <Reorder.Group
                      axis="y"
                      values={category.products}
                      onReorder={(newProducts) =>
                        handleReorderProduct(category.id, newProducts)
                      }
                      disabled={!isEditing}
                    >
                      {category.products.map((product) => (
                        <Reorder.Item
                          key={product.id}
                          value={product}
                          dragListener={false}
                        >
                          <div
                            id={`product-${product.id}`}
                            className="transition duration-300"
                          >
                            <ProductCard
                              product={product}
                              isEditing={isEditing}
                              deleteProduct={deleteProduct}
                              category={category}
                              moveProductDown={moveProductDown}
                              moveProductUp={moveProductUp}
                              firstProduct={category.products[0]}
                              lastProduct={
                                category.products[category.products.length - 1]
                              }
                              setCategories={setCategories}
                            />
                          </div>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>
                  </div>
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : (
        // Non-editable Categories
        <div className="mt-6 space-y-10">
          {categories.map((category) => (
            <div key={category.id}>
              <h2 className="text-2xl font-semibold text-white/90 tracking-tight text-left pt-1">
                {category.name}
              </h2>
              <div className="flex mt-4 gap-4">
                <div className="flex-1">
                  {category.products.map((product) => (
                    <div
                      key={product.id}
                      id={`product-${product.id}`}
                      className="transition duration-300"
                    >
                      <ProductCard
                        product={product}
                        isEditing={isEditing}
                        deleteProduct={deleteProduct}
                        category={category}
                        moveProductDown={moveProductDown}
                        moveProductUp={moveProductUp}
                        firstProduct={category.products[0]}
                        lastProduct={
                          category.products[category.products.length - 1]
                        }
                        setCategories={setCategories}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-0">
        <AddCategoryModal
          open={addCategoryModal}
          addCategory={handleAddCategory}
          onClose={() => setAddCategoryModal(false)}
        />
        <AddProductModal
          open={addProductModal}
          categoryList={categories}
          addProduct={handleAddProduct}
          selectedCategoryId={selectedCategoryId}
          onClose={() => {
            setSelectedCategoryId(null);
            setAddProductModal(false);
          }}
        />
        <DeleteProductModal
          open={deleteCategoryModal}
          onClose={() => setDeleteCategoryModal(false)}
          onConfirm={handleDeleteCategory}
          productName={categoryToDelete?.name}
          isCategoryModal={true}
        />
      </div>
    </div>
  );
}

// Add this to your global CSS (e.g., EditableMenu.css or a global styles file)
// .animate-zoom {
//   transform: scale(1.05);
//   transition: transform 0.3s ease;
// }
