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
    (async () => {
      try {
        const menuData = await getMenu();
        setCategories(menuData || []);
      } catch (error) {
        console.error("Error al cargar el menú:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getRestaurantData();
        setRestaurant(data || {});
      } catch (error) {
        console.error("Error al cargar el restaurante:", error);
      }
    })();
  }, []);

  const slug = restaurant?.email?.split("@")[0];
  const totalVisits = 0;
  const totalProducts = categories.reduce(
    (acc, category) => acc + (category.products?.length || 0),
    0
  );

  return (
    <>
      <TopBar title="" showButtons={false} />
      <div className="p-6 md:p-8 bg-navy min-h-screen text-white">
        <h1 className="text-3xl font-semibold tracking-tight mb-1">
          Bienvenido,{" "}
          {restaurant?.name
            ?.toLowerCase()
            .replace(/\b\w/g, (l) => l.toUpperCase()) || "Admin"}
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Panel de Control 📊
        </p>

        {/* Métricas */}
        <section className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="bg-navy/80 border border-white/20 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Visitas al menú en el mes
            </h2>
            <p className="mt-4 text-4xl font-bold">{totalVisits}</p>
            <p className="text-xs text-muted-foreground mt-3">
              Actualización en tiempo real
            </p>
          </div>

          <div className="bg-navy/80 border border-white/20 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Productos publicados
            </h2>
            <p className="mt-4 text-4xl font-bold">{totalProducts}</p>
            <p className="text-xs text-muted-foreground mt-3">
              Número total de productos en tu carta
            </p>
          </div>
        </section>

        {/* Live Preview */}
        {slug && (
          <section className="mb-12">
            <h3 className="text-white/80 text-sm font-medium uppercase tracking-wide mb-4 border-b border-white/10 pb-2">
              Vista previa en vivo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Página Web", path: `/${slug}` },
                { label: "Menú Digital", path: `/${slug}/menu` },
              ].map((preview, i) => (
                <a
                  key={i}
                  href={preview.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-[190px] rounded-xl border border-white/10 overflow-hidden shadow-md group transition-all bg-navy/80 hover:ring-2 hover:ring-white/20"
                >
                  <div className="absolute top-2 left-3 text-sm text-white/80 font-medium tracking-wide z-10">
                    {preview.label}
                  </div>
                  <div className="absolute top-2 right-3 flex items-center gap-1 z-10">
                    {/* Glowing red dot + LIVE */}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                    <span className="text-[11px] text-red-400 font-bold tracking-widest">
                      LIVE
                    </span>
                  </div>

                  <iframe
                    src={preview.path}
                    className="w-full h-full blur-sm opacity-30 scale-[0.985] contrast-[1.1] pointer-events-none transition-all duration-300 group-hover:blur-[2px] group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Botones */}
        <div className="flex flex-col md:flex-row gap-3 w-full max-w-xl">
          <Button
            className="w-full bg-white/20 text-white hover:bg-white/30"
            onClick={() => router.push("/admin/menu")}
          >
            Modificar productos del Menú
          </Button>
          <Button
            className="w-full bg-white/20 text-white hover:bg-white/30"
            onClick={() => router.push("/admin/customization")}
          >
            Personalización Visual
          </Button>
        </div>
      </div>
    </>
  );
}
