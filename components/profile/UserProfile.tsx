// components/profile/UserProfile.tsx

'use client';

import { useRouter } from 'next/navigation';
import css from './UserProfile.module.css';
import { useAuthStore } from '@/stores/authStore';

interface UserProfileProps {
  user: { name: string };
  userId: string;
}

export default function UserProfile({ user, userId }: UserProfileProps) {
  const currentUser = useAuthStore((state) => state.user);
  const isOwner = currentUser?.id === userId;

  const firstletter = user.name.charAt(0).toUpperCase();
  const router = useRouter();

  return (
    <div className={css.userProfileContainer}>
      <div className={css.avatar}>{firstletter}</div>
      <h2 className={css.username}>{user.name}</h2>

      {isOwner && (
        <button
          className={css.button}
          onClick={() => router.push('/profile/edit')}
        >
          Редагувати профіль
        </button>
      )}
    </div>
  );
}
