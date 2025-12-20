import { getCategories } from "@/lib/api/clientApi";
import ToolsPageClient from "./ToolsPage.Client";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}): Promise<Metadata> {
  const { q: query, category: categoryId } = await searchParams;
  const categories = await getCategories();
  const category = categories.find((c) => c._id === categoryId);

  let title = "Всі інструменти";
  if (query) {
    title = `Пошук: ${query}`;
  } else if (category) {
    title = category.title;
  }

  return {
    title: `${title} | ToolNext`,
    description: category
      ? `Список інструментів для категорії ${category.title}`
      : "Знайдіть найкращі інструменти для оренди на ToolNext",
  };
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q: query, category: categoryId } = await searchParams;

  const categories = await getCategories();
  const initialSearch = typeof query === "string" ? query : "";
  const initialCategoryId = typeof categoryId === "string" ? categoryId : "";

  return (
    <ToolsPageClient
      initialCategories={categories}
      initialSearch={initialSearch}
      initialCategoryId={initialCategoryId}
    />
  );
}
