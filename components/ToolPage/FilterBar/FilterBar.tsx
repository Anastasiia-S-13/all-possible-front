"use client";
import { Category } from "@/types/typesCategories";
import CategorySelect from "../CategorySelect/CategorySelect";

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string;
  resetSearch: string;
  onCategoryChange: (categoryId: string) => void;
  onSearchChange: (value: string) => void;
  setSearchQuery: (value: string) => void;
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
