"use client";

import { use } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { fetchToolById } from "@/lib/api/clientApi";
import EditToolForm from "@/components/forms/EditToolForm/EditToolForm";
import styles from "./EditToolPage.module.css";

interface EditToolPageProps {
  params: Promise<{ toolId: string }>;
}

export default function EditToolPage({ params }: EditToolPageProps) {
  const { toolId } = use(params);
  const { isAuthenticated, isLoading: authLoading, user } = useAuthStore();

  const {
    data: tool,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tool", toolId],
    queryFn: () => fetchToolById(toolId),
  });

  if (authLoading || isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.loading}>Завантаження...</div>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.loginRequired}>
            <h2>Потрібна авторизація</h2>
            <p>Для редагування інструменту потрібно увійти в систему</p>
            <Link href="/auth/login" className={styles.loginBtn}>
              Увійти
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (error || !tool) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.error}>Помилка завантаження інструменту</div>
        </div>
      </main>
    );
  }

  const isOwner = user?.id === tool.owner;

  if (!isOwner) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.accessDenied}>
            <h2>Доступ заборонено</h2>
            <p>Ви не можете редагувати цей інструмент</p>
            <Link href={`/tools/${toolId}`} className={styles.backBtn}>
              Повернутися до інструменту
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Редагування інструменту</h1>
        <EditToolForm tool={tool} />
      </div>
    </main>
  );
}
