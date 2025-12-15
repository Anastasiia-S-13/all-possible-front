// lib/api/serverApi.ts
import { User } from '../../types/User';
import { Tool } from '../../types/Tool';

export async function getUserById(userId: string): Promise<User> {
  const res = await fetch(`${process.env.API_URL}/users/${userId}`, {
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Не вдалося завантажити користувача');
  }

  return res.json();
}

export async function getUserTools(userId: string): Promise<Tool[]> {
  const res = await fetch(`${process.env.API_URL}/users/${userId}/tools`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}
