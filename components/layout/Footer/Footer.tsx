// components/layout/Footer/Footer.tsx
import Link from "next/link";
import styles from "./Footer.module.css";
import pageStyles from "@/app/page.module.css";

type FooterProps = {
  isAuthenticated: boolean;
};

export default function Footer({ isAuthenticated }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={pageStyles.container}>
        <div className={styles.top}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="ToolNext home">
            <svg
              className={styles.logoSvg}
              viewBox="0 0 175 32"
              aria-hidden="true"
            >
              <use href="/sprite/sprite.svg#icon-footer-logo" />
            </svg>
          </Link>

          {/* Navigation */}
          <nav className={styles.nav}>
            <Link href="/">Головна</Link>
            <Link href="/tools">Інструменти</Link>

            {isAuthenticated ? (
              <>
                <Link href="/profile">Мій профіль</Link>
                <Link href="/create">Опублікувати</Link>
              </>
            ) : (
              <>
                <Link href="/auth/login">Увійти</Link>
                <Link href="/auth/register">Зареєструватися</Link>
              </>
            )}
          </nav>

          {/* Social icons */}
          <ul className={styles.socials}>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg className={styles.socialSvg}>
                  <use href="/sprite/sprite.svg#icon-Facebook" />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg className={styles.socialSvg}>
                  <use href="/sprite/sprite.svg#icon-Instagram" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.divider} />

        <p className={styles.copy}>
          © <span className={styles.year}>{new Date().getFullYear()}</span>{" "}
          ToolNext. Всі права захищені.
        </p>
      </div>
    </footer>
  );
}
