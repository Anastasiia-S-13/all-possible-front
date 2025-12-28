// components/ThemeSwitch.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid var(--color-border)",
        background: "var(--color-scheme-1-background)",
        color: "var(--color-text)",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "bold",
        transition: "all 0.2s ease"
      }}
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}