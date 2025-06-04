"use client";

import { useEffect, useState } from "react";
import useMenuLogic from "@/components/admin/menuLogics";
import { useRouter } from "next/navigation";
import TopBar from "@/components/admin/TopBar";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [categories, setCategories] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const router = useRouter();

  const { getMenu, getRestaurantData } = useMenuLogic(setCategories);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const restaurant = await getRestaurantData();
        setRestaurant(restaurant || {});
        console.log("Restaurant:", restaurant);
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
      <div className="p-8 bg-navy min-h-screen text-white">
        <h1 className="text-3xl font-semibold tracking-tight mb-1">
          Bienvenido,{" "}
          {restaurant?.name
            ?.toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase()) || "Admin"}
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Panel de Control 📊
        </p>

        <section className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-card border border-white/20 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Visitas al menú
            </h2>
            <p className="mt-4 text-4xl font-bold">{totalVisits}</p>
            <p className="text-xs text-muted-foreground mt-3">
              Actualización en tiempo real
            </p>
          </div>

          <div className="bg-card border border-white/20 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Productos publicados
            </h2>
            <p className="mt-4 text-4xl font-bold">{totalProducts}</p>
            <p className="text-xs text-muted-foreground mt-3">
              Número total de productos en tu carta
            </p>
          </div>
        </section>

        <div className="flex flex-col md:flex-row gap-3 w-full max-w-xl">
          <Button className="w-full" onClick={() => router.push("/admin/menu")}>
            Configurar Menú
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/admin/customization")}
          >
            Personalización Visual
          </Button>
        </div>
      </div>
    </>
  );
}
