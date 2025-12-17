"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import HeaderModal from "../modals/HeaderModal";

interface HeaderProps {
  isLoggedIn: boolean;
  userName?: string;
}

export default function Header({ isLoggedIn, userName }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <svg className={styles.logo} aria-hidden="true">
            <use href="../../public/sprite/sprite.svg" />
          </svg>
          <Link href="/" className={styles.logoText}>
            ToolNext
          </Link>
        </div>

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
              <span className={styles.userName}>{userName}</span>
            </div>
          )}

          {/* Burger */}
          <button
            type="button"
            className={styles.burger}
            aria-label="Відкрити меню"
            onClick={() => setIsMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile menu modal */}
      {isMenuOpen && <HeaderModal onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
