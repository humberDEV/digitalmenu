import PreviewPage from "@/components/admin/PreviewPage";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  return {
    title: `${params.slug} web`,
    description: "Consulta el menú de este restaurante",
  };
}

export default async function PublicPage({ params }) {
  const { slug } = params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/menu/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return notFound();

    const business = await res.json();

    return <PreviewPage businessData={business} slugName={slug} />;
  } catch (err) {
    console.error("Error al cargar menú público:", err);
    return notFound();
  }
}
