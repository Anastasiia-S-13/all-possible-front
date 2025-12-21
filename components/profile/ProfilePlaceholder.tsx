// components/profile/ProfilePlaceholder.tsx

"use client";

import { useRouter } from "next/navigation";
import styles from "./ProfilePlaceholder.module.css";
import { useAuthStore } from "@/stores/authStore";

interface ProfilePlaceholderProps {
  userId: string;
}

export default function ProfilePlaceholder({ userId }: ProfilePlaceholderProps) {
  const { user: currentUser, isLoading } = useAuthStore();
  const router = useRouter();

  if (isLoading) return null;

  const isOwner = currentUser?.id === userId;

  const handleClick = () => {
    router.push(isOwner ? "/tools/new" : "/tools");
  };

  return (
    <div className={styles.placeholderContainer}>
      <h1 className={styles.extraTitle}>Інструменти</h1>

      <p className={styles.title}>
        {isOwner
          ? "У вас ще не опубліковано жодного інструменту"
          : "У цього користувача ще не опубліковано жодного інструменту"}
      </p>

      <p className={styles.subtitle}>
        {isOwner
          ? "Мерщій опублікуйте своє перше оголошення, щоб почати отримувати пасивний дохід"
          : "У нас є великий вибір інструментів від інших користувачів"}
      </p>

      <button type="button" className={styles.button} onClick={handleClick}>
        {isOwner ? "Опублікувати інструмент" : "Всі інструменти"}
      </button>
    </div>
  );
}
