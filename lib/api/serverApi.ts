'use server';

import { cookies } from 'next/headers';
import { User } from '@/types/User';
import { Tool, ToolHttpRequest } from '@/types/Tool';
import { api } from '@/lib/api/api';

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export async function getUserById(userId: string): Promise<User> {
  const headers = await getCookieHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      cache: 'no-store',
      headers,
    }
  );

  if (!res.ok) {
    throw new Error('Не вдалося завантажити користувача');
  }

  const data = await res.json();

  return {
    ...data,
    id: data._id ?? data.id,
  };
}


export const getUserTools = async (userId: string): Promise<Tool[]> => {
  try {
    const headers = await getCookieHeader();
    const { data } = await api.get<Tool[]>(`/users/${userId}/tools`, { headers });
    return data;
  } catch (error) {
    console.warn('getUserTools failed:', error);
    return [];
  }
};

export const getAllToolsServer = async (): Promise<ToolHttpRequest> => {
  try {
    const headers = await getCookieHeader();
    const { data } = await api.get<ToolHttpRequest>('/tools', {
      params: { perPage: 8 },
      headers,
    });
    return data;
  } catch (error) {
    console.warn('getAllToolsServer failed:', error);
    throw error;
  }
};

export const getMe = async (): Promise<User | null> => {
  try {
    const headers = await getCookieHeader();
    const { data } = await api.get<User>('/users/me', { headers });
    return {
      ...data,
      id: (data as any)._id ?? data.id,
    };
  } catch (error) {
    console.warn('getMe failed:', error);
    return null;
  }
};

export const updateProfileFormData = async (formData: FormData) => {
  try {
    const { data } = await api.put('/users/me', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  } catch (error) {
    console.warn('updateProfileFormData failed:', error);
    throw error;
  }
};
