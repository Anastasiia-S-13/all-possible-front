"use client";

import { useEffect, useState, useMemo } from "react";
import { Category } from "@/types/typesCategories";
import { Tool } from "@/types/Tool";
import { getAllTools } from "@/lib/api/clientApi";
import ToolsGrid from "@/components/tools/ToolsGrid";
import FilterBar from "@/components/ToolPage/FilterBar";
import styles from "./ToolsPage.module.css";
import Loader from "@/app/loading";
import { useRouter } from "next/navigation";

interface ToolsPageClientProps {
  initialCategories: Category[];
  initialSearch: string;
  initialCategoryId?: string;
}

export default function ToolsPageClient({
  initialCategories,
  initialSearch,
  initialCategoryId = "",
}: ToolsPageClientProps) {
  const router = useRouter();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const selectedCategoryName = useMemo(() => {
    return initialCategories.find((c) => c._id === selectedCategory)?.title || "";
  }, [initialCategories, selectedCategory]);

  const perPage = 16;

  useEffect(() => {
    const loadTools = async () => {
      setLoading(true);
      try {
        const data = await getAllTools({
          search: searchQuery,
          category: selectedCategory,
          page: currentPage,
          perPage,
        });

        if (data && Array.isArray(data.tools)) {
          setTools(data.tools);
          setTotalPages((data as any).pages || (data as any).totalPages || 1);
        } else if (Array.isArray(data)) {
          setTools(data);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Failed to fetch tools:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTools();
  }, [searchQuery, selectedCategory, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const onCategoryChange = (id: string) => {
    setSelectedCategory(id);
    if (id) {
      router.push(`/tools?category=${id}`);
    } else {
      router.push(`/tools`);
    }
  };

  const onResetFilters = () => {
    setSelectedCategory("");
    setSearchQuery("");
    router.push("/tools");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className={styles.toolsPage}>
      <div className="container">
        <h1 className={styles.title}>
          {searchQuery
            ? `Результати пошуку: ${searchQuery}`
            : selectedCategoryName || "Всі інструменти"}
        </h1>
        <div className={styles.head}>
          <FilterBar
            categories={initialCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
          <button
            className={styles.resetCategories}
            onClick={onResetFilters}
          >
            Скинути фільтри
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ToolsGrid tools={tools} />
            {currentPage === 1 && totalPages > 1 && (
              <button onClick={() => handlePageChange(2)} className="gridBtn">
                Показати більше
              </button>
            )}

            {currentPage > 1 && totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={styles.pageBtn}
                >
                  Назад
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.activePage : ""
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={styles.pageBtn}
                >
                  Вперед
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
