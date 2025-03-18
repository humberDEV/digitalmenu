import { useState } from "react";
import { toast } from "sonner";

export default function useMenuLogic() {
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
      ],
    },
    { id: 2, name: "Papas", products: [] },
  ]);

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

  return {
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
  };
}
