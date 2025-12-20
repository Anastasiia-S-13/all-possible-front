"use client";
import css from "./NewTool.module.css";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AddEditToolForm from "@/components/forms/AddEditToolForm/AddEditToolForm";
// Імпорт для перевірки авторизації (треба адаптуйти під AuthProvider)
// import { useAuth } from "@/providers/AuthProvider";

export default function CreateToolPage() {
  //const { isAuthenticated } = useAuth(); // Припускаємо, що є такий хук
  const router = useRouter();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/auth/login"); // Перенаправлення на логін, якщо не авторизований
  //   }
  // }, [isAuthenticated, router]);

  // if (!isAuthenticated) {
  //   return <div>Завантаження...</div>; // Або плейсхолдер
  // }

  return (
    <div className={css.container}>
      <h1 className={css.title}>Публікація інструменту</h1>
      <AddEditToolForm /> {/* Використання існуючої форми */}
    </div>
  );
}
