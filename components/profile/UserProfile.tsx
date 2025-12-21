// components/profile/UserProfile.tsx

"use client";

import { useRouter } from "next/navigation";
import css from "./UserProfile.module.css";
import { useAuthStore } from "@/stores/authStore";
import { Tool } from "@/types/Tool";
import ToolsGrid from "./ToolsGrid";
import ProfilePlaceholder from "./ProfilePlaceholder";
import FeedbacksBlock from "../home/Feedbacks/FeedbacksBlock";

interface UserProfileProps {
  user: { name: string };
  userId: string;
  tools: Tool[];
}

export default function UserProfile({ user, userId, tools }: UserProfileProps) {
  const currentUser = useAuthStore((state) => state.user);
  const isOwner = currentUser?.id === userId;

  const firstletter = user.name.charAt(0).toUpperCase();
  const router = useRouter();

  const hasTools = tools.length > 0;

  return (
    <div>
      <div className={css.userProfileContainer}>
        <div className={css.avatar}>{firstletter}</div>
        <h2 className={css.username}>{user.name}</h2>

        {isOwner && (
          <button
            className={css.button}
            onClick={() => router.push("/profile/edit")}
          >
            Редагувати профіль
          </button>
        )}
      </div>
      {hasTools ? (
        <ToolsGrid tools={tools} />
      ) : (
        <ProfilePlaceholder userId={userId} />
      )}
      <FeedbacksBlock userId={userId} isOwner={isOwner} />
    </div>
  );
}
