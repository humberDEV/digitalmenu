"use client";

import { use, useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import ProductCard from "./ProductCard";
import "@/styles/admin/EditableMenu.css";

import AddCategoryModal from "./AddCategoryModal";
import AddProductModal from "./AddProductModal";
import DeleteProductModal from "./DeleteProductModal";

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
  return (
    <div className="container mx-auto p-6">
      {isEditing && (
        <div className="flex gap-4">
          <button
            className="btn btn-neutral px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-600"
            onClick={() => setAddCategoryModal(true)}
          >
            + Agregar Categoría
          </button>
          <button
            className="btn btn-neutral px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-blue-600"
            onClick={() => setAddProductModal(true)}
          >
            + Agregar Producto
          </button>
        </div>
      )}

      {/* Editable Categories */}
      {isEditing ? (
        <Reorder.Group
          axis="y"
          values={categories}
          onReorder={handleReorderCategory}
          className="space-y-6"
        >
          {categories.map((category) => (
            <Reorder.Item
              key={category.id}
              value={category}
              dragListener={false}
            >
              <div className="p-4 rounded-lg bg-white shadow-md mt-6">
                <div className="flex justify-between items-center">
                  {isEditing ? (
                    <input
                      type="text"
                      className="input input-bordered font-bold text-2xl text-gray-800 rounded-lg p-3"
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
                    <h2 className="text-3xl font-bold text-gray-900">
                      {category.name}
                    </h2>
                  )}
                  {isEditing && (
                    <button
                      className="btn-xs text-red p-2 rounded-full"
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

                <div className="flex mt-4 gap-4">
                  {isEditing && (
                    <div className="flex flex-col items-center gap-3">
                      {category !== categories[0] && (
                        <button
                          className="btn btn-xs transition hover:bg-gray-200"
                          onClick={() => moveCategoryUp(category.id)}
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
                          className="btn btn-xs transition hover:bg-gray-200"
                          onClick={() => moveCategoryDown(category.id)}
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

                  <div className="flex-1 border border-gray-300 p-4 rounded-lg mt-2 ml-6 bg-gray-50">
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
        <div className="mt-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="p-4 bg-white shadow-md rounded-lg mt-6 text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                {category.name}
              </h2>
              <div className="flex mt-4 gap-4">
                <div className="flex-1 border border-gray-300 p-4 rounded-lg mt-2 ml-6 bg-gray-50">
                  {category.products.map((product) => (
                    <ProductCard
                      key={product.id}
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
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
    </div>
  );
}
