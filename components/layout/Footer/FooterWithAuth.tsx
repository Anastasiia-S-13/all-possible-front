"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import { useAuthStore } from "@/stores/authStore";

export default function FooterWithAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const pathname = usePathname();

  const isAuthPage = pathname?.startsWith("/auth");

  if (isAuthPage) return null;

  return <Footer isAuthenticated={isAuthenticated} />;
}
