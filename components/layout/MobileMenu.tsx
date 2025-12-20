"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <Link href="/" className={styles.logo} onClick={onClose}>
            <svg width="20" height="20" aria-hidden="true">
              <use href="/sprite/sprite.svg#icon-Logo" />
            </svg>
            <span className={styles.logoText}>ToolNext</span>
          </Link>

          <button
            type="button"
            className={styles.closeButton}
            aria-label="Закрити меню"
            onClick={onClose}
          >
            <svg width="24" height="24" aria-hidden="true">
              <use href="/sprite/sprite.svg#icon-close" />
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink} onClick={onClose}>
              Головна
            </Link>
            <Link href="/tools" className={styles.navLink} onClick={onClose}>
              Інструменти
            </Link>

            {isAuthenticated && user?.id ? (
              <Link href={`/profile/${user.id}`} className={styles.navLink} onClick={onClose}>
                Мій профіль
              </Link>
            ) : !isAuthenticated ? (
              <Link href="/auth/login" className={styles.navLink} onClick={onClose}>
                Увійти
              </Link>
            ) : null}
          </nav>

          {!isAuthenticated ? (
            <Link href="/auth/register" className={styles.registerButton} onClick={onClose}>
              Зареєструватися
            </Link>
          ) : (
            <>
              <Link href="/create" className={styles.publishButton} onClick={onClose}>
                Опублікувати оголошення
              </Link>
              <div className={styles.userSection}>
                <div className={styles.userInfo}>
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name || "User"}
                      width={32}
                      height={32}
                      className={styles.userAvatar}
                    />
                  ) : (
                    <div className={styles.userAvatarPlaceholder}>
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className={styles.userName}>{user?.name}</span>
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
