"use client";

import "@/styles/admin/scroll.css";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

// components
import TopBar from "@/components/admin/TopBar";
import EditableMenu from "@/components/admin/EditableMenu";
import PreviewMenu from "@/components/admin/PreviewMenu";
import useMenuLogic from "@/components/admin/menuLogics";

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
  const [menuConfig, setMenuConfig] = useState({
    backgroundColor: "#f5f5f5",
    fontFamily: { name: "Poppins", class: "font-poppins" },
    categoryTitleColor: "#f5f5f5",
    categoryTitleSize: 40,
    productTitleColor: "#f5f5f5",
    productTitleSize: 20,
    productPriceColor: "#f5f5f5",
    productPriceSize: 16,
    productDescriptionColor: "#f5f5f5",
    productDescriptionSize: 14,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedChanges, setEditedChanges] = useState([]);

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
    getMenuConfig,
  } = useMenuLogic(setCategories);

  // 📌 Función para guardar el menú
  const handleSave = async () => {
    setIsEditing((prev) => !prev);
    if (!isEditing) {
      return;
    }
    await saveMenu(categories);
    console.log("Cambios guardados:", editedChanges);
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

  // 📌 Función para agregar una categoría
  const addCategoryWithLogging = (category) => {
    addCategory(category);
    setEditedChanges((prevChanges) => [
      ...prevChanges,
      {
        action: "add",
        entity: "category",
        details: category,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // 📌 Función para eliminar una categoría
  const deleteCategoryWithLogging = (categoryId) => {
    handleDeleteCategory(categoryId);
    setEditedChanges((prevChanges) => [
      ...prevChanges,
      {
        action: "delete",
        entity: "category",
        details: { id: categoryId },
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // 📌 Función para mover una categoría
  const moveCategoryWithLogging = (categoryId, direction) => {
    if (direction === "up") {
      moveCategoryUp(categoryId);
    } else {
      moveCategoryDown(categoryId);
    }
    setEditedChanges((prevChanges) => [
      ...prevChanges,
      {
        action: "move",
        entity: "category",
        details: { id: categoryId, direction },
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // 📌 Función para agregar un producto
  const addProductWithLogging = (categoryId, product) => {
    addProduct(categoryId, product);
    setEditedChanges((prevChanges) => [
      ...prevChanges,
      {
        action: "add",
        entity: "product",
        details: product,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // 📌 Función para eliminar un producto
  const deleteProductWithLogging = (productId) => {
    deleteProduct(productId);
    setEditedChanges((prevChanges) => [
      ...prevChanges,
      {
        action: "delete",
        entity: "product",
        details: { id: productId },
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  // 📌 UseEffect para obtener la configuración del menú
  useEffect(() => {
    const fetchMenuConfig = async () => {
      if (getMenuConfig) {
        const config = await getMenuConfig();
        setMenuConfig(config);
      }
    };
    fetchMenuConfig();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-y-hidden bg-[#0b0f19] text-white">
      <TopBar
        title={"Configura tu menú"}
        isEditing={isEditing}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <div className="flex flex-col md:flex-row h-screen ">
        {/* Contenedor del menú editable */}
        <div className="w-full md:w-2/3 p-2 max-h-screen space-y-6 overflow-y-auto no-scrollbar">
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
              handleDeleteCategory={deleteCategoryWithLogging}
              addCategory={addCategoryWithLogging}
              addProduct={addProductWithLogging}
              deleteProduct={deleteProductWithLogging}
              moveCategoryDown={moveCategoryWithLogging}
              moveCategoryUp={moveCategoryWithLogging}
              moveProductDown={moveProductDown}
              moveProductUp={moveProductUp}
              handleReorderCategory={handleReorderCategory}
              handleReorderProduct={handleReorderProduct}
            />
          )}
        </div>

        {/* Contenedor de la vista previa */}
        <div className="w-full md:w-1/3 p-6 max-h-screen overflow-y-hidden no-scrollbar">
          {isLoading ? (
            <div className="text-gray-500 text-center p-4">
              Cargando vista previa...
            </div>
          ) : isError ? (
            <div className="text-red-500 text-center p-4">
              No se pudo cargar la vista previa.
            </div>
          ) : (
            <PreviewMenu menuData={categories} menuConfig={menuConfig} />
          )}
        </div>
      </div>
    </div>
  );
}
