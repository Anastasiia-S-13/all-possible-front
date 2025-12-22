"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import styles from "./Header.module.css";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);

  if (pathname?.startsWith("/auth")) {
    return null;
  }

  const isLoggedIn = hasHydrated && isAuthenticated;
  const userId = user?.id;
  const userName = user?.name;
  const userAvatar = user?.avatar;

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <header className={styles.header}>
          <Link href="/" className={styles.logoContainer}>
            <Image
              src="/images/logo.svg"
              alt="ToolNext"
              width={124}
              height={20}
              priority
            />
          </Link>

          <nav className={styles.nav}>
            <Link href="/">Головна</Link>
            <Link href="/tools">Інструменти</Link>

            {hasHydrated && isLoggedIn && userId && (
              <Link href={`/profile/${userId}`}>Мій профіль</Link>
            )}

            {hasHydrated && !isLoggedIn && (
              <Link href="/auth/login">Увійти</Link>
            )}
          </nav>

          <div className={styles.actions}>
            {hasHydrated && !isLoggedIn && (
              <Link href="/auth/register" className={styles.signupButton}>
                Зареєструватися
              </Link>
            )}

            {isLoggedIn && (
              <>
                <Link href="/tools/new" className={styles.publishButton}>
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
      </div>

      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
