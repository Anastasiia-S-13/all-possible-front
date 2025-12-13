"use client";

import React, { useState } from "react";
import styles from "./Header.module.css";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import { Link } from "react-router-dom";

interface HeaderProps {
  isLoggedIn: boolean;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, userName }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img src="/favicon.ico" alt="ToolNext Logo" className={styles.logo} />
          <a href="/">ToolNex</a>
        </div>

        {/* Desktop nav */}
        <nav className={styles.nav}>
          <a href="/">Головна</a>
          <a href="/tools">Інструменти</a>
          {!isLoggedIn && (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsLoginOpen(true);
              }}
            >
              Увійти
            </a>
          )}
        </nav>

        <div className={styles.actions}>
          {!isLoggedIn && (
            <a href="/create" className={`${styles.signupButton} ${styles.publishButton}`}>
              Опублікувати оголошення
            </a>
          )}

          {!isLoggedIn && (
            <button className={styles.signupButton} onClick={() => setIsRegisterOpen(true)}>
              Зареєструватися
            </button>
          )}

          {isLoggedIn && (
            <div className={styles.userBlock}>
              <img src="/avatar.png" className={styles.avatar} />
              <span>{userName}</span>
            </div>
          )}

          <button className={styles.burger} onClick={() => setIsRegisterOpen(!isRegisterOpen)}>
            ☰
          </button>
        </div>
      </header>

      {/* Modals */}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      {isRegisterOpen && <RegisterModal onClose={() => setIsRegisterOpen(false)} />}
    </>
  );
};

export default Header;
