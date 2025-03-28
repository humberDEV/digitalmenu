import { useState } from "react";
import { toast } from "sonner";
import { parseCookies } from "nookies";

export default function useMenuLogic(setCategories) {
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // 📌 Abrir modal de eliminación de categoría
  const openDeleteCategoryModal = (category) => {
    setCategoryToDelete(category);
    setDeleteCategoryModal(true);
  };

  // 📌 Eliminar una categoría
  const handleDeleteCategory = () => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryToDelete.id));
    toast.success(`Categoría "${categoryToDelete.name}" eliminada`);
    setDeleteCategoryModal(false);
  };

  // 📌 Agregar una nueva categoría
  const addCategory = (category) => {
    setCategories((prev) => [...prev, { ...category, products: [] }]);
    toast.success(`Categoría "${category.name}" agregada exitosamente`);
  };

  // 📌 Agregar un producto a una categoría
  const addProduct = (product) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === product.categoryId
          ? { ...c, products: [...c.products, product] }
          : c
      )
    );
  };

  // 📌 Eliminar un producto de una categoría
  const deleteProduct = (productId) => {
    setCategories((prev) =>
      prev.map((c) => ({
        ...c,
        products: c.products.filter((p) => p.id !== productId),
      }))
    );
    toast.success("Producto eliminado exitosamente");
  };

  // 📌 Mover una categoría abajo
  const moveCategoryDown = (categoryId) => {
    setCategories((prev) => {
      const index = prev.findIndex((c) => c.id === categoryId);
      if (index === prev.length - 1) return prev;

      const newCategories = [...prev];
      [newCategories[index], newCategories[index + 1]] = [
        newCategories[index + 1],
        newCategories[index],
      ];
      return newCategories;
    });
  };

  // 📌 Mover una categoría arriba
  const moveCategoryUp = (categoryId) => {
    setCategories((prev) => {
      const index = prev.findIndex((c) => c.id === categoryId);
      if (index === 0) return prev;

      const newCategories = [...prev];
      [newCategories[index], newCategories[index - 1]] = [
        newCategories[index - 1],
        newCategories[index],
      ];
      return newCategories;
    });
  };

  // 📌 Mover un producto abajo
  const moveProductDown = (categoryId, productId) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== categoryId) return c;

        const index = c.products.findIndex((p) => p.id === productId);
        if (index === -1 || index === c.products.length - 1) return c; // Si no se encuentra o es el último, no hacer nada

        const newProducts = [...c.products];
        [newProducts[index], newProducts[index + 1]] = [
          newProducts[index + 1],
          newProducts[index],
        ];

        return { ...c, products: newProducts };
      })
    );
  };

  // 📌 Mover un producto arriba
  const moveProductUp = (categoryId, productId) => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== categoryId) return c;

        const index = c.products.findIndex((p) => p.id === productId);
        if (index === -1 || index === 0) return c; // Si no se encuentra o es el primero, no hacer nada

        const newProducts = [...c.products];
        [newProducts[index], newProducts[index - 1]] = [
          newProducts[index - 1],
          newProducts[index],
        ];

        return { ...c, products: newProducts };
      })
    );
  };

  const handleReorderCategory = (newCategories) => {
    setCategories(newCategories);
  };

  const handleReorderProduct = (categoryId, newProducts) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, products: newProducts }
          : category
      )
    );
  };

  // BACKEND API CALLS
  // 📌 Función para guardar el menú
  const saveMenu = async (categories) => {
    console.log("Guardando menú:", categories);
    try {
      const cookies = parseCookies();
      const token = cookies.token;

      if (!token) {
        alert("No tienes un token de autenticación.");
        return;
      }

      // Verificar si categories es válido antes de enviarlo
      if (!Array.isArray(categories)) {
        console.error("Error: categories no es un array válido:", categories);
        toast.error("Error: Los datos del menú son inválidos.");
        return;
      }

      const response = await fetch("/api/menu/savemenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categories }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al guardar el menú.");
      }

      toast.success("Menú guardado correctamente!");
    } catch (error) {
      console.error(error);
      toast.error(`Hubo un error: ${error.message}`);
    }
  };

  // 📌 Función para traernos el menú
  const getMenu = async () => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    const response = await fetch("/api/menu/getmenu", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al cargar el menú.");
    }

    const data = await response.json();
    console.log("Menú cargado:", data.categories);
    return data.categories || [];
  };

  return {
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
    saveMenu,
    getMenu,
    handleReorderCategory,
    handleReorderProduct,
  };
}
