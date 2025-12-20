"use client";
import { Category } from "@/types/typesCategories";
import styles from "./FilterBar.module.css";
import CategorySelect from "./CategorySelect";
import { SearchToolForm } from "../forms/SearchToolForm/SearchToolForm";

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onSearchChange: (value: string) => void;
}

const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onSearchChange,
}: FilterBarProps) => {
  return (
    <>
      <CategorySelect
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        onSearchChange={onSearchChange}
      />
    </>
  );
};

export default FilterBar;
