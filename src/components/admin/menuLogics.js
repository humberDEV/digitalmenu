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
    try {
      const cookies = parseCookies();
      const token = cookies.token;

      if (!token) {
        toast.error("No tienes un token de autenticación.");
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

  // 📌 Función para guardar la personalización del menú
  const saveMenuConfig = async (menuConfig) => {
    try {
      const cookies = parseCookies();
      const token = cookies.token;

      if (!token) {
        toast.error("No tienes un token de autenticación.");
        return;
      }

      if (typeof menuConfig !== "object" || menuConfig === null) {
        console.error("Error: menuConfig no es un objeto válido:", menuConfig);
        toast.error("Error: Los datos de la configuración son inválidos.");
        return;
      }

      const response = await fetch("/api/menu/savemenuconfig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ menuConfig }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error al guardar la configuración del menú."
        );
      }

      toast.success("Configuración guardada correctamente!");
    } catch (error) {
      console.error(error);
      toast.error(`Hubo un error: ${error.message}`);
    }
  };

  // 📌 Función para obtener la configuración del menú
  const getMenuConfig = async () => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    console.log("Token:", token);

    const response = await fetch("/api/menu/getmenuconfig", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Respuesta:", response);

    if (!response.ok) {
      throw new Error("Error al cargar la configuración del menú.");
    }

    const data = await response.json();
    return data.config || {};
  };

  // 📌 Función para guardar los datos del negocio
  const saveBusinessData = async (businessData) => {
    try {
      const cookies = parseCookies();
      const token = cookies.token;

      if (!token) {
        toast.error("No tienes un token de autenticación.");
        return;
      }

      if (typeof businessData !== "object" || businessData === null) {
        console.error(
          "Error: businessData no es un objeto válido:",
          businessData
        );
        toast.error("Error: Los datos del negocio son inválidos.");
        return;
      }

      const response = await fetch("/api/menu/savebusinessdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(businessData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error al guardar los datos del negocio."
        );
      }

      toast.success("Datos del negocio guardados correctamente!");
    } catch (error) {
      console.error(error);
      toast.error(`Hubo un error: ${error.message}`);
    }
  };

  // 📌 Función para traernos los datos del negocio
  const getBusinessData = async () => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    const response = await fetch("/api/menu/getbusinessdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al cargar los datos del negocio.");
    }

    const data = await response.json();
    return data || {};
  };

  const getRestaurantData = async () => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    const response = await fetch("/api/menu/getrestaurantdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al cargar los datos del restaurante.");
    }

    const data = await response.json();
    return data || {};
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
    saveMenuConfig,
    getMenuConfig,
    saveBusinessData,
    getBusinessData,
    getRestaurantData,
  };
}
