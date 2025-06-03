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
    getMenu,
    getMenuConfig,
    saveMenuConfig,
    saveBusinessData,
    getBusinessData,
  } = useMenuLogic(setCategories);

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

  const [businessData, setBusinessData] = useState(null);
  const [isLoadingBusinessData, setIsLoadingBusinessData] = useState(true);
  const [isLoadingMenuConfig, setIsLoadingMenuConfig] = useState(true);

  const loadBusinessData = async () => {
    try {
      const data = await getBusinessData();
      setBusinessData(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los datos del negocio.");
    } finally {
      setIsLoadingBusinessData(false);
    }
  };

  const loadMenuConfig = async () => {
    try {
      const config = await getMenuConfig();
      setMenuConfig(config);
    } catch (error) {
      toast.error("Hubo un error al cargar la configuración.");
    } finally {
      setIsLoadingMenuConfig(false);
    }
  };

  useEffect(() => {
    loadBusinessData();
    loadMenuConfig();
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  if (isLoadingBusinessData || isLoadingMenuConfig || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Cargando configuración...</p>
      </div>
    );
  }

  const handleSave = async () => {
    setIsEditing((prev) => !prev);

    if (!isEditing) return;

    if (tab === 0) {
      await saveMenuConfig(menuConfig);
    } else if (tab === 1) {
      await saveBusinessData(businessData);
    }
  };

  const handleCancel = async () => {
    // reiniciar data con la de bbdd
    const menuConfigInit = await getMenuConfig();
    setMenuConfig(menuConfigInit);
    setIsEditing(!isEditing);
  };

  return (
    <div className="scroll-y- bg-navy text-white min-h-screen">
      <TopBar
        title={"Personaliza tu menú"}
        isEditing={isEditing}
        onSave={handleSave}
        onCancel={handleCancel}
      ></TopBar>

      <div className="flex flex-row">
        <div className="w-full md:w-2/3 p-4 overflow-y-auto bg-navy rounded-xl  shadow-xl">
          <Personalization
            isEditing={isEditing}
            businessData={businessData}
            setBusinessData={setBusinessData}
            themeConfig={menuConfig}
            setThemeConfig={setMenuConfig}
            tab={tab}
            setTab={changeTab}
          />
        </div>
        {tab === 0 && (
          <div className="w-full md:w-1/3 p-4">
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
          <div className="w-full md:w-1/3 p-4 max-h-screen overflow-y-auto no-scrollbar">
            {isLoading ? (
              <div className="text-gray-500 text-center p-4">
                Cargando vista previa...
              </div>
            ) : isError ? (
              <div className="text-red-500 text-center p-4">
                No se pudo cargar la vista previa.
              </div>
            ) : (
              <PreviewPage businessData={businessData} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
