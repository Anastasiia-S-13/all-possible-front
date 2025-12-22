"use client";

import { useRouter } from "next/navigation";
import css from "./UserProfile.module.css";
import { useAuthStore } from "@/stores/authStore";
import { UserProfileProps } from "@/types/User";

export default function UserProfile({
  user,
  userId,
  tools = [],
}: UserProfileProps) {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
  const isOwner = currentUser?.id === userId;

  const firstLetter = user.name.charAt(0).toUpperCase();
  const hasTools = tools.length > 0;

  return (
    <div>
      <div className={css.userProfileContainer}>
        <div className={css.userInfo}>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className={css.avatar} />
          ) : (
            <div className={css.avatar}>{firstLetter}</div>
          )}
          <h2 className={css.username}>{user.name}</h2>
        </div>
        {isOwner && (
          <button
            className={css.button}
            onClick={() => router.push(`/profile/${userId}/edit`)}
          >
            Редагувати профіль
          </button>
        )}
      </div>
    </div>
  );
}
