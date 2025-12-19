"use client";

import { useEffect, useState, useMemo } from "react";
import { Category } from "@/types/typesCategories";
import { Tool } from "@/types/Tool";
import { getAllTools } from "@/lib/api/clientApi";
import ToolsGrid from "@/components/tools/ToolsGrid";
import FilterBar from "@/components/ToolPage/FilterBar";
import styles from "./ToolsPage.module.css";
import Loader from "@/app/loading";

interface ToolsPageClientProps {
  initialCategories: Category[];
  initialSearch: string;
}

export default function ToolsPageClient({
  initialCategories,
  initialSearch,
}: ToolsPageClientProps) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const perPage = 8;

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
            : "Всі інструменти"}
        </h1>
        <div className={styles.head}>
          <FilterBar
            categories={initialCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          <button
            className={styles.resetCategories}
            onClick={() => {
              setSelectedCategory("");
              setSearchQuery("");
            }}
          >
            Скинути фільтри
          </button>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ToolsGrid tools={tools} />

            {totalPages > 1 && (
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
                    className={`${styles.pageBtn} ${
                      currentPage === i + 1 ? styles.activePage : ""
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
