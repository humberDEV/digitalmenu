"use client";

import { useEffect, useState } from "react";
import useMenuLogic from "@/components/admin/menuLogics";
import { useRouter } from "next/navigation";
import TopBar from "@/components/admin/TopBar";

export default function DashboardPage() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const { getMenu } = useMenuLogic(setCategories);

  useEffect(() => {
    async function fetchData() {
      try {
        const menuData = await getMenu();
        setCategories(menuData || []);
      } catch (error) {
        console.error("Error al cargar el menú:", error);
      }
    }
    fetchData();
  }, []);

  const totalVisits = 0;
  const totalProducts = categories.reduce(
    (acc, category) => acc + (category.products?.length || 0),
    0
  );

  return (
    <>
      <TopBar title={""} showButtons={false} />
      <div className="p-6 space-y-2">
        <h1 className="text-3xl font-bold text-left text-gray-800">
          Bienvenido, Admin
        </h1>
        <p className="text-left text-gray-500">Panel de Control 📈</p>

        <div className="grid gap-4 sm:grid-cols-2 ">
          <div className="bg-base-100 border border-base-200 rounded-xl p-6">
            <h2 className="text-sm font-medium text-gray-500">
              Visitas al menú
            </h2>
            <p className="mt-1 text-3xl font-bold text-primary">
              {totalVisits}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Actualización en tiempo real
            </p>
          </div>

          <div className="bg-base-100 border border-base-200 rounded-xl p-6">
            <h2 className="text-sm font-medium text-gray-500">
              Productos publicados
            </h2>
            <p className="mt-1 text-3xl font-bold text-primary">
              {totalProducts}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Número total de productos en tu carta
            </p>
          </div>
        </div>

        <div className="flex flex-col max-w-72 justify-center gap-4">
          <button
            className="btn transition-colors"
            onClick={() => router.push("/admin/menu")}
          >
            Ir a Configuración del Menú
          </button>
          <button
            className="btn transition-colors"
            onClick={() => router.push("/admin/customization")}
          >
            Personalizar Colores y Página web
          </button>
        </div>
      </div>
    </>
  );
}
