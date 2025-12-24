import { getCategories } from "@/lib/api/clientApi";
import ToolsPageClient from "./ToolsPage.Client";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ categories?: string; q?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { categories, q } = await searchParams;

  let categoryTitle = "";

  if (categories) {
    try {
      const allCategories = await getCategories();
      const found = allCategories.find((c: any) => c._id === categories);
      categoryTitle = found ? found.title : categories;
    } catch (error) {
      categoryTitle = categories;
    }
  } else if (q) {
    categoryTitle = `Пошук: ${q}`;
  } else {
    categoryTitle = "Всі інструменти";
  }

  return {
    title: `Інструменти | ${categoryTitle}`,
    description: `Список інструментів для ${categoryTitle}`,
    openGraph: {
      title: `Інструменти | ${categoryTitle}`,
      description: `Список інструментів для ${categoryTitle}`,
      url: `/tools${categories ? `?categories=${categories}` : q ? `?q=${q}` : ""
        }`,
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

  const mappedCategories = categories.map((cat: any) => ({
    ...cat,
    description: cat.description ?? "",
    keywords: cat.keywords ?? [],
  }));

  return (
    <ToolsPageClient
      initialCategories={mappedCategories}
      initialSearch={initialSearch}
    />
  );
}
