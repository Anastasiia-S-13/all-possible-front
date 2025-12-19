"use client";

import Footer from "./Footer";
import { useAuthStore } from "@/stores/authStore";

export default function FooterWithAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return <Footer isAuthenticated={isAuthenticated} />;
}
