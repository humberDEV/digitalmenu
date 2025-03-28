"use client";

// components
import TopBar from "@/components/admin/TopBar";
import EditableMenu from "@/components/admin/EditableMenu";
import PreviewMenu from "@/components/admin/PreviewMenu";
import useMenuLogic from "@/components/admin/menuLogics";
import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function MenuPage() {
  // 📌 Función para obtener el menú
  const getMenuFunction = async () => {
    return await getMenu();
  };

  const {
    data: categoriesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: getMenuFunction,
  });

  useEffect(() => {
    if (categoriesData) {
      const formattedCategories = categoriesData.map((category) => ({
        ...category,
        id: category._id,
        products: category.products.map((product) => ({
          ...product,
          id: product._id,
        })),
      }));
      setCategories(formattedCategories);
    }
  }, [categoriesData]);

  const [categories, setCategories] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const {
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
    saveMenu,
    getMenu,
  } = useMenuLogic(setCategories);

  // 📌 Función para guardar el menú
  const handleSave = async () => {
    setIsEditing((prev) => !prev);
    if (!isEditing) {
      return;
    }
    await saveMenu(categories);
  };

  // 📌 Función para cancelar la edición
  const handleCancel = async () => {
    const freshMenu = await getMenu();

    const formattedCategories = freshMenu.map((category) => ({
      ...category,
      id: category._id || uuidv4(),
      products: category.products.map((product) => ({
        ...product,
        id: product._id || uuidv4(),
      })),
    }));

    setCategories(formattedCategories);
    setIsEditing(false);
  };

  return (
    <>
      <TopBar
        title={"Configura tu menú"}
        isEditing={isEditing}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/5 p-4">
          {isLoading ? (
            <div className="text-gray-500 text-center p-4">
              Cargando menú...
            </div>
          ) : isError ? (
            <div className="text-red-500 text-center p-4">
              Error al cargar el menú.
            </div>
          ) : (
            <EditableMenu
              isEditing={isEditing}
              categories={categories}
              setCategories={setCategories}
              addCategoryModal={addCategoryModal}
              setAddCategoryModal={setAddCategoryModal}
              addProductModal={addProductModal}
              setAddProductModal={setAddProductModal}
              deleteCategoryModal={deleteCategoryModal}
              setDeleteCategoryModal={setDeleteCategoryModal}
              categoryToDelete={categoryToDelete}
              openDeleteCategoryModal={openDeleteCategoryModal}
              handleDeleteCategory={handleDeleteCategory}
              addCategory={addCategory}
              addProduct={addProduct}
              deleteProduct={deleteProduct}
              moveCategoryDown={moveCategoryDown}
              moveCategoryUp={moveCategoryUp}
              moveProductDown={moveProductDown}
              moveProductUp={moveProductUp}
              handleReorderCategory={handleReorderCategory}
              handleReorderProduct={handleReorderProduct}
            />
          )}
        </div>

        <div className="w-full md:w-2/5 p-4">
          {isLoading ? (
            <div className="text-gray-500 text-center p-4">
              Cargando vista previa...
            </div>
          ) : isError ? (
            <div className="text-red-500 text-center p-4">
              No se pudo cargar la vista previa.
            </div>
          ) : (
            <PreviewMenu menuData={categories} />
          )}
        </div>
      </div>
    </>
  );
}
