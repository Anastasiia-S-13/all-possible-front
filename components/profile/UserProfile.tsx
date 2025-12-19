// components/profile/UserProfile.tsx

'use client';

import { useRouter } from 'next/navigation';
import css from './UserProfile.module.css';
import { UserProfileProps } from '../../types/User';

export default function UserProfile({ user, isOwner }: UserProfileProps) {
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
