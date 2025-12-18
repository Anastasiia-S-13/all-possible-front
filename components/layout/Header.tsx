"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import styles from "./Header.module.css";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const isLoggedIn = isAuthenticated;
  const userId = user?.id;
  const userName = user?.name;
  const userAvatar = user?.avatar;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <header className={styles.header}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <svg className={styles.logo} aria-hidden="true">
            <use href="/sprite/sprite.svg#logo" />
          </svg>

          <Link href="/" className={styles.logoText}>
            ToolNext
          </Link>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <Link href="/">Головна</Link>
          <Link href="/tools">Інструменти</Link>

          {isLoggedIn && <Link href={`/profile/${userId}`}>Мій профіль</Link>}

          {!isLoggedIn && <Link href="/auth/login">Увійти</Link>}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          {!isLoggedIn && (
            <Link href="/auth/register" className={styles.signupButton}>
              Зареєструватися
            </Link>
          )}

          {isLoggedIn && (
            <>
              <Link href="/create" className={styles.publishButton}>
                Опублікувати оголошення
              </Link>

              <div className={styles.userBlock}>
                {userAvatar ? (
                  <Image
                    src={userAvatar}
                    alt={userName || "User"}
                    width={32}
                    height={32}
                    className={styles.userAvatar}
                  />
                ) : (
                  <div className={styles.userAvatarPlaceholder}>
                    {userName?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <span className={styles.userName}>{userName}</span>
              </div>

              <div className={styles.divider} />

              <button
                type="button"
                className={styles.logoutButton}
                onClick={handleLogout}
                aria-label="Вийти"
              >
                <svg width="24" height="24" aria-hidden="true">
                  <use href="/sprite/sprite.svg#icon-logout" />
                </svg>
              </button>
            </>
          )}

          {/* Burger */}
          <button
            type="button"
            className={styles.burger}
            aria-label="Відкрити меню"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg width="24" height="24" aria-hidden="true">
              <use href="/sprite/sprite.svg#icon-menu" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu modal */}
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
