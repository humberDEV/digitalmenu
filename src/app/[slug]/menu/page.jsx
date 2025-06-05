import Menu from "@/components/publicMenu/Menu";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  return {
    title: `${params.slug} - Menú`,
    description: "Consulta el menú de este restaurante",
  };
}

export default async function PublicMenuPage({ params }) {
  const { slug } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/menu/public/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return notFound();

    const { menuData, menuConfig } = await res.json();

    return (
      <div className="flex items-center justify-center h-screen bg-muted">
        <Menu menuData={menuData} menuConfig={menuConfig} />
      </div>
    );
  } catch (error) {
    console.error("Error al cargar el menú público:", error);
    return notFound();
  }
}
