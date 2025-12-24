"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/types/typesCategories";
import { Tool } from "@/types/Tool";
import { getAllTools } from "@/lib/api/clientApi";
import ToolsGrid from "@/components/ToolPage/ToolsGrid/ToolsGrid";
import FilterBar from "@/components/ToolPage/FilterBar/FilterBar";
import styles from "./ToolsPage.module.css";
import Loader from "@/app/loading";
import MetadataUpdater from "@/components/ToolPage/MetadataUpdater";
import ScrollToTop from "@/components/Button/ScrollToTop";

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
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const router = useRouter();

  const perPage = 16;

  const selectedCategoryTitle =
    selectedCategory === ""
      ? ""
      : initialCategories.find((cat) => cat._id === selectedCategory)?.title ||
        "";

  useEffect(() => {
    const loadTools = async () => {
      setLoading(true);
      try {
        const data = await getAllTools({
          search: searchQuery,
          category: selectedCategory,
          page: 1,
          perPage,
        });

        if (data && Array.isArray(data.tools)) {
          setTools(data.tools);
          setTotalPages((data as any).pages || (data as any).totalPages || 1);
          setCurrentPage(1);
        } else if (Array.isArray(data)) {
          setTools(data);
          setTotalPages(1);
          setCurrentPage(1);
        }
      } catch (error) {
        console.error("Failed to fetch tools:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTools();
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    if (selectedCategory === "" && searchQuery === "") {
      router.replace("/tools");
    }
  }, [selectedCategory, searchQuery, router]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 1200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoadMore = async () => {
    if (currentPage >= totalPages) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const data = await getAllTools({
        search: searchQuery,
        category: selectedCategory,
        page: nextPage,
        perPage,
      });

      if (data && Array.isArray(data.tools)) {
        setTools((prevTools) => [...prevTools, ...data.tools]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to load more tools:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery("");

    if (categoryId) {
      router.push(`/tools`);
    } else {
      router.push("/tools");
    }
  };

  const handleScrillToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const hasMore = currentPage < totalPages;

  return (
    <section className={styles.toolsPage}>
      <MetadataUpdater categoryTitle={selectedCategoryTitle} />
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
            resetSearch={selectedCategory}
            onCategoryChange={handleCategoryChange}
            onSearchChange={setSearchQuery}
            setSearchQuery={setSearchQuery}
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
            {hasMore && (
              <button
                onClick={handleLoadMore}
                className="gridBtn"
                disabled={loadingMore}
              >
                {loadingMore ? "Завантаження..." : "Показати більше"}
              </button>
            )}
          </>
        )}
        <ScrollToTop isVisible={showScrollBtn} onClick={handleScrillToTop} />
      </div>
    </section>
  );
}
