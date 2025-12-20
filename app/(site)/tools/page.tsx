import { getCategories } from "@/lib/api/clientApi";
import ToolsPageClient from "./ToolsPage.Client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ categories: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categories } = await params;

  return {
    title: `Інструменти | ${categories}`,
    description: `Список інструментів для категорії ${categories}`,
    openGraph: {
      title: `Інструменти | ${categories}`,
      description: `Список інструментів для категорії ${categories}`,
      url: `/tools?categories=${categories}`,
      type: "website",
    },
  };
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const categories = await getCategories();
  const initialSearch = typeof q === "string" ? q : "";

  return (
    <ToolsPageClient
      initialCategories={categories}
      initialSearch={initialSearch}
    />
  );
}
