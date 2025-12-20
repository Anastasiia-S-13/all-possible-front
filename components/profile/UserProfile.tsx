// components\profile\UserProfile.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import css from './UserProfile.module.css';
import Link from 'next/link';
import { UserProfileProps } from '../../types/User';

export default function UserProfile({ user, userId, containerClassName }: UserProfileProps) {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
  const isOwner = currentUser?.id === userId;

  const firstLetter = user.name.charAt(0).toUpperCase();

  return (
    <div className={containerClassName || css.userProfileContainer}>
      {user.avatar ? (
        <img src={user.avatar} alt={user.name} className={css.avatar} />
      ) : (
        <div className={css.avatar}>{firstLetter}</div>
      )}

      <h2 className={css.username}>{user.name}</h2>

      {isOwner && (
          <Link href={`/profile/${userId}/edit`} className={css.button}>
             Редагувати профіль
          </Link>
     
      )}
    </div>
  );
}
