"use client";

import TopBar from "@/components/admin/TopBar";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useMenuLogic from "@/components/admin/menuLogics";

import MenuConfigurations from "@/components/admin/Menuconfigurations";
import PreviewMenu from "@/components/admin/PreviewMenu";

export default function CustomizationPage() {
  const [categories, setCategories] = useState([]);

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

  const { getMenu } = useMenuLogic(setCategories);

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

  const [businessDataMock, setBusinessDataMock] = useState({
    name: "Nombre empresa",
    logoUrl: "https://via.placeholder.com/150",
    glovoUrl: "https://www.glovoapp.com/",
    justEatUrl: "https://www.just-eat.es/",
    deliverooUrl: "https://deliveroo.es/",
    uberEatsUrl: "https://www.ubereats.com/",
    websiteUrl: "https://www.google.com/",
    phone: "123456789",
    address: "Calle Falsa 123",
    city: "Springfield",
    postalCode: "12345",
    country: "USA",
  });

  const [menuConfigMock, setMenuConfigMock] = useState({
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial",

    categoryTitleColor: "#333",
    categoryTitleSize: 40,

    productTitleColor: "#ff0000",
    productTitleSize: 20,

    productPriceColor: "#0000ff",
    productPriceSize: 16,

    productDescriptionColor: "#666",
    productDescriptionSize: 14,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (isEditing) {
      console.log("Guardando cambios");
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    // reiniciar data con la de bbdd
    setIsEditing(!isEditing);
  };

  return (
    <div className="scroll-y-">
      <TopBar
        title={"Personaliza tu menú"}
        isEditing={isEditing}
        onSave={handleSave}
        onCancel={handleCancel}
      ></TopBar>

      <div className="flex flex-row ">
        <div className="w-3/5 p-4">
          <MenuConfigurations
            isEditing={isEditing}
            businessData={businessDataMock}
            setBusinessData={setBusinessDataMock}
            themeConfig={menuConfigMock}
            setThemeConfig={setMenuConfigMock}
          />
        </div>
        <div className="w-2/5 p-4">
          {isLoading ? (
            <div className="text-gray-500 text-center p-4">
              Cargando vista previa...
            </div>
          ) : isError ? (
            <div className="text-red-500 text-center p-4">
              No se pudo cargar la vista previa.
            </div>
          ) : (
            <PreviewMenu menuData={categories} menuConfig={menuConfigMock} />
          )}
        </div>
      </div>
    </div>
  );
}
