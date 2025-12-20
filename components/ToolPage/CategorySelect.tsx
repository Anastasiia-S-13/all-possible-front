"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./CategorySelect.module.css";
import { Category } from "@/types/typesCategories";

interface Props {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategorySelect({
  categories,
  selectedCategory,
  onCategoryChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (id: string) => {
    onCategoryChange(id);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <div
        className={`${styles.select} ${open ? styles.open : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {categories.find((c) => c._id === selectedCategory)?.title ||
          "Всі категорії"}
      </div>

      {open && (
        <div className={styles.dropdown}>
          <ul className={styles.scrollArea}>
            <li
              className={`${styles.option} ${
                selectedCategory === "" ? styles.active : ""
              }`}
              onClick={() => handleSelect("")}
            >
              Всі категорії
            </li>

            {categories.map((cat) => (
              <li
                key={cat._id}
                className={`${styles.option} ${
                  selectedCategory === cat._id ? styles.active : ""
                }`}
                onClick={() => handleSelect(cat._id)}
              >
                {cat.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
