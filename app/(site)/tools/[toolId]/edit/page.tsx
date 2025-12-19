import { notFound, redirect } from "next/navigation";
import AddEditToolForm from "@/components/forms/AddEditToolForm";
import { Tool } from "@/types/Tool";
import { getCurrentUser } from "@/lib/getCurrentUser";
import styles from "./page.module.css";

type Props = {
  params: Promise<{
    toolId: string;
  }>;
};

async function getToolById(id: string): Promise<Tool | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const res = await fetch(`${apiUrl}/tools/${id}`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function EditToolPage({ params }: Props) {
  const { toolId } = await params;

  // 1️⃣ auth
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login"); // ✅ а не notFound
  }

  // 2️⃣ tool
  const tool = await getToolById(toolId);

  if (!tool) {
    notFound();
  }

  // 3️⃣ перевіряємо власника
  if (tool.ownerId !== user.id) {
    notFound(); // 🔒 НЕ ВЛАСНИК
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Редагувати інструмент</h1>
      <AddEditToolForm tool={tool} />
    </div>
  );
}
