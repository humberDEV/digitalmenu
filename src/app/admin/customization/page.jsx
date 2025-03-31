"use client";

import TopBar from "@/components/admin/TopBar";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useMenuLogic from "@/components/admin/menuLogics";
import { toast } from "sonner";

import Personalization from "@/components/admin/Personalization";
import PreviewMenu from "@/components/admin/PreviewMenu";
import PreviewPage from "@/components/admin/PreviewPage";

export default function CustomizationPage() {
  // get tab from local storage
  const [tab, setTab] = useState(0);
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

  useEffect(() => {
    const storedValue = localStorage.getItem("tab");
    console.log("storedValue", storedValue);

    if (storedValue === null) {
      localStorage.setItem("tab", "0");
      setTab(0);
    } else {
      setTab(parseInt(storedValue));
    }
  }, []);

  const changeTab = (newTab) => {
    localStorage.setItem("tab", newTab);
    setTab(newTab);
  };

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

  const { getMenu, getMenuConfig, saveMenuConfig } =
    useMenuLogic(setCategories);

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
    name: "Mi Restaurante",
    logoUrl: null,
    subtitle: "El mejor sabor en cada bocado",
    languages: ["es", "en"],
    showReviewButton: true,
    socialLinks: {
      tiktok: "https://www.tiktok.com/@mirestaurante",
      instagram: "https://www.instagram.com/mirestaurante",
      facebook: "https://www.facebook.com/mirestaurante",
      twitter: "https://twitter.com/mirestaurante",
    },
    deliveryLinks: {
      glovo: "https://www.glovoapp.com/",
      justEat: "https://www.just-eat.es/",
      deliveroo: "https://deliveroo.es/",
      uberEats: "https://www.ubereats.com/",
    },
    phone: "123456789",
    theme: {
      backgroundColor: "#ffffff",
      textColor: "#333333",
      fontFamily: { name: "Poppins", class: "font-poppins" },
    },
  });

  useEffect(() => {
    const loadMenuConfig = async () => {
      try {
        const config = await getMenuConfig();
        setMenuConfig(config);
      } catch (error) {
        toast.error("Hubo un error al cargar la configuración.");
      }
    };

    loadMenuConfig();
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    setIsEditing((prev) => !prev);
    if (!isEditing) {
      return;
    }
    await saveMenuConfig(menuConfig);
  };

  const handleCancel = async () => {
    // reiniciar data con la de bbdd
    const menuConfigInit = await getMenuConfig();
    setMenuConfig(menuConfigInit);
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
        <div className="w-3/5 p-4 overflow-y-scroll">
          {/* personalizacion */}
          <Personalization
            isEditing={isEditing}
            businessData={businessDataMock}
            setBusinessData={setBusinessDataMock}
            themeConfig={menuConfig}
            setThemeConfig={setMenuConfig}
            tab={tab}
            setTab={changeTab}
          />
        </div>
        {tab === 0 && (
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
              <PreviewMenu menuData={categories} menuConfig={menuConfig} />
            )}
          </div>
        )}

        {tab === 1 && (
          <div className="w-2/5 p-4">
            <PreviewPage
              businessData={businessDataMock}
              setBusinessData={setBusinessDataMock}
              isEditing={isEditing}
            />
          </div>
        )}
      </div>
    </div>
  );
}
