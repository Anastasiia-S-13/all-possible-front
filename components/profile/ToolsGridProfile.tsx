"use client";

import { Tool } from "../../types/Tool";
import ToolCard from "../tools/ToolCard";
import { useAuthStore } from "@/stores/authStore";
import styles from "./ToolsGrid.module.css";

interface ToolsGridProps {
  tools: Tool[];
  ownerId: string;
  listRef: React.RefObject<HTMLUListElement | null>;
}

export default function ToolsGridProfile({
  tools,
  ownerId,
  listRef,
}: ToolsGridProps) {
  const { isAuthenticated, user: currentUser, _hasHydrated } = useAuthStore();
  const isOwner =
    _hasHydrated && isAuthenticated && currentUser?.id === ownerId;

  if (tools.length === 0) {
    return null;
  }

  return (
    <>
      <h2>Інструменти</h2>
      <ul className={styles.list} ref={listRef}>
        {tools.map((tool) => (
          <li key={tool._id} className={styles.item}>
            <ToolCard
              id={tool._id}
              name={tool.name}
              pricePerDay={tool.pricePerDay}
              image={tool.images}
              rating={tool.rating}
              isOwner={isOwner}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
