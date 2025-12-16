"use client";

import Link from "next/link";
import styles from "./Header.module.css";

interface HeaderProps {
  isLoggedIn: boolean;
  userName?: string;
}

export default function Header({ isLoggedIn, userName }: HeaderProps) {
  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <img src="/logo.svg" alt="ToolNext Logo" className={styles.logo} />
        <Link href="/">ToolNext</Link>
      </div>

      {/* Desktop navigation */}
      <nav className={styles.nav}>
        <Link href="/">Головна</Link>
        <Link href="/tools">Інструменти</Link>

        {isLoggedIn && <Link href="/profile">Мій профіль</Link>}
        {isLoggedIn && <Link href="/create">Опублікувати оголошення</Link>}

        {!isLoggedIn && <Link href="/auth/login">Увійти</Link>}
      </nav>

      {/* Actions */}
      <div className={styles.actions}>
        {!isLoggedIn && (
          <Link href="/auth/register" className={`${styles.signupButton} ${styles.publishButton}`}>
            Зареєструватися
          </Link>
        )}

        {isLoggedIn && (
          <div className={styles.userBlock}>
            <div className={styles.userAvatar}>{userName?.[0]?.toUpperCase()}</div>
            <span>{userName}</span>
          </div>
        )}

        {/* Burger → mobile menu page */}
        <Link href="/menu" className={styles.burger}>
          ☰
        </Link>
      </div>
    </header>
  );
}
