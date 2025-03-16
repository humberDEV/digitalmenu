"use client";

import ProductCard from "./ProductCard";
import "@/styles/admin/EditableMenu.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState, useEffect } from "react";

import AddCategoryModal from "./AddCategoryModal";
import AddProductModal from "./AddProductModal";

const DroppableCategory = ({ category, children }) => {
  const [, drop] = useDrop({
    accept: "PRODUCT",
    drop: () => ({ categoryId: category.id }),
  });

  return (
    <div className="p-2 mt-10">
      <h2 className="text-3xl font-bold pb-2">{category.name}</h2>
      <div ref={drop} className="border border-gray-300 p-2 ">
        <div className="flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
};

export default function EditableMenu({ isEditing, saveProduct }) {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Hamburguesas",
      products: [
        {
          id: 101,
          name: "Hamburguesa de pollo",
          price: 8.9,
          description: "Con queso, cebolla y cilantro",
        },
        {
          id: 102,
          name: "Hamburguesa de carne",
          price: 9.9,
          description: "Con queso, cebolla y cilantro",
        },
      ],
    },
    {
      id: 2,
      name: "Papas",
      products: [],
    },
  ]);

  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);

  const moveProduct = (
    productId,
    sourceCategoryId,
    targetCategoryId,
    sourceIndex,
    targetIndex
  ) => {
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories];

      const sourceCategory = newCategories.find(
        (c) => c.id === sourceCategoryId
      );
      const targetCategory = newCategories.find(
        (c) => c.id === targetCategoryId
      );

      if (!sourceCategory || !targetCategory) return newCategories;

      const productIndex = sourceCategory.products.findIndex(
        (p) => p.id === productId
      );
      if (productIndex === -1) return newCategories;

      const [productToMove] = sourceCategory.products.splice(productIndex, 1);

      if (sourceCategoryId === targetCategoryId) {
        // Movimiento dentro de la misma categoría
        targetCategory.products.splice(targetIndex, 0, productToMove);
      } else {
        // Movimiento a otra categoría
        targetCategory.products.push(productToMove);
      }

      return [...newCategories];
    });
  };

  const DraggableProduct = ({
    product,
    index,
    moveProduct,
    categoryId,
    isEditing,
    saveProduct,
  }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [animate, setAnimate] = useState(false); // Estado para animación "pop"
    const [{ isDragging: dragState }, drag] = useDrag({
      type: "PRODUCT",
      item: { id: product.id, index, categoryId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: () => {
        setAnimate(true); // Activar la animación cuando se suelta
      },
    });

    const [, drop] = useDrop({
      accept: "PRODUCT",
      hover: (draggedItem) => {
        if (
          draggedItem.id !== product.id &&
          draggedItem.categoryId === categoryId
        ) {
          moveProduct(
            draggedItem.id,
            categoryId,
            categoryId,
            draggedItem.index,
            index
          );
          draggedItem.index = index;
        }
      },
    });

    useEffect(() => {
      if (animate) {
        const timeout = setTimeout(() => {
          setAnimate(false); // Desactivar la animación después de un breve periodo
        }, 300); // Duración de la animación en milisegundos
        return () => clearTimeout(timeout);
      }
    }, [animate]);

    return (
      <div
        ref={(node) => drag(drop(node))}
        className={`draggable ${animate ? "animate-pop" : ""}`}
        style={{ opacity: dragState ? 0.8 : 1 }}
      >
        <ProductCard
          product={product}
          isEditing={isEditing}
          saveProduct={saveProduct}
          deleteProduct={() => setDeleteProductModal(true)}
        />
      </div>
    );
  };

  const addCategory = (category) => {
    setCategories([
      ...categories,
      { ...category, products: category.products || [] },
    ]);
  };

  const addProduct = (product) => {
    setCategories((prevCategories) =>
      prevCategories.map((c) =>
        Number(c.id) === Number(product.categoryId)
          ? { ...c, products: [...(c.products || []), product] }
          : c
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {isEditing && (
          <div className="flex flex-row gap-2 mt-4">
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
          <DroppableCategory key={category.id} category={category}>
            {category?.products?.map((product, index) => (
              <DraggableProduct
                key={product.id}
                product={product}
                index={index}
                categoryId={category.id}
                moveProduct={moveProduct}
                isEditing={isEditing}
                saveProduct={saveProduct}
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
    </DndProvider>
  );
}
