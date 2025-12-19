import { getCategories } from "@/lib/api/clientApi";
import ToolsPageClient from "./ToolsPage.Client";
export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  const categories = await getCategories();
  const initialSearch = typeof query === "string" ? query : "";

  return (
    <ToolsPageClient
      initialCategories={categories}
      initialSearch={initialSearch}
    />
  );
}
