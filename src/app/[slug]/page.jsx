import { getBusinessBySlug } from "@/lib/business";
import PreviewPage from "@/components/PreviewPage";
import { notFound } from "next/navigation";

export default async function PublicPage({ params }) {
  const business = await getBusinessBySlug(params.slug);
  if (!business) return notFound();

  return <PreviewPage businessData={business} />;
}
