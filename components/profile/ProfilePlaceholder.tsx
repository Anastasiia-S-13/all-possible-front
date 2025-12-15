// components/profile/ProfilePlacsholder.tsx
"use client";

import { useRouter } from "next/navigation";
import styles from "./ProfilePlaceholder.module.css";

export default function ProfilePlaceholder({ isOwner }: { isOwner: boolean }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(isOwner ? "/tools/add" : "/");
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.extraTitle}></h1>

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

      <button
        type="button"
        className={styles.button}
        onClick={handleClick}
      >
        {isOwner ? "Опублікувати інструмент" : "Всі інструменти"}
      </button>
    </section>
  );
}
