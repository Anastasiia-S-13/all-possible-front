"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/stores/authStore";
import styles from "./MobileMenu.module.css";
import Modal from "@/components/Modal/Modal";
import ConfirmationModal from "@/components/modals/LogoutModal/ConfirmationModal";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isLoggedIn = hasHydrated && isAuthenticated;

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = async () => {
    await logout();
    setIsLogoutModalOpen(false);
    onClose();
    router.push("/");
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        onClose();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

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

            {hasHydrated && isLoggedIn && user?.id && (
              <Link href={`/profile/${user.id}`} className={styles.navLink} onClick={onClose}>
                Мій профіль
              </Link>
            )}
            {hasHydrated && !isLoggedIn && (
              <Link href="/auth/login" className={styles.navLink} onClick={onClose}>
                Увійти
              </Link>
            )}
          </nav>

          {hasHydrated && !isLoggedIn && (
            <Link href="/auth/register" className={styles.registerButton} onClick={onClose}>
              Зареєструватися
            </Link>
          )}
          {isLoggedIn && (
            <>
              <Link href="/tools/new" className={styles.publishButton} onClick={onClose}>
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
                  onClick={handleLogoutClick}
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

      {isLogoutModalOpen && (
        <Modal onClose={handleLogoutCancel}>
          <ConfirmationModal
            title="Ви впевнені, що хочете вийти?"
            leftText="Залишитись"
            rightText="Вийти"
            onLeftClick={handleLogoutCancel}
            onRightClick={handleLogoutConfirm}
          />
        </Modal>
      )}
    </div>
  );
}
