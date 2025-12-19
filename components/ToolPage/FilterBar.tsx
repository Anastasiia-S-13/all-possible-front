"use client";
import { Category } from "@/types/typesCategories";
import styles from "./FilterBar.module.css";
import CategorySelect from "./CategorySelect";

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: FilterBarProps) => {
  return (
    // <div className={styles.filterBar}>
    //   <button
    //     className={`${styles.categoryBtn} ${
    //       selectedCategory === "" ? styles.active : ""
    //     }`}
    //     onClick={() => onCategoryChange("")}
    //   >
    //     Всі
    //   </button>
    //   {categories.map((category) => (
    //     <button
    //       key={category._id}
    //       className={`${styles.categoryBtn} ${
    //         selectedCategory === category._id ? styles.active : ""
    //       }`}
    //       onClick={() => onCategoryChange(category._id)}
    //     >
    //       {category.title}
    //     </button>
    //   ))}
    // </div>

    <CategorySelect
      categories={categories}
      selectedCategory={selectedCategory}
      onCategoryChange={onCategoryChange}
    />
  );
};

export default FilterBar;
