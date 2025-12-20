// lib/api/serverApi.ts

import { cookies } from 'next/headers';
import { api } from './api';
import  { User } from '@/types/User';
import  { Tool, ToolHttpRequest } from '@/types/Tool';

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const getUserById = async (
  userId: string
): Promise<User | null> => {
  try {
    const headers = await getCookieHeader();

    const { data } = await api.get<User>(`/users/${userId}`, {
      headers,
    });

    return {
      ...data,
      id: (data as any)._id ?? data.id,
    };
  } catch (error) {
    console.warn('getUserById failed:', error);
    return null; 
  }
};

export const getUserTools = async (
  userId: string
): Promise<Tool[]> => {
  try {
    const headers = await getCookieHeader();

    const { data } = await api.get<Tool[]>(
      `/users/${userId}/tools`,
      { headers }
    );

    return data;
  } catch (error) {
    console.warn('getUserTools failed:', error);
    return [];
  }
};

export const getAllToolsServer = async (): Promise<ToolHttpRequest> => {
  const headers = await getCookieHeader();

  const { data } = await api.get<ToolHttpRequest>('/tools', {
    params: {
      perPage: 8,
    },
    headers,
  });

  return data;
};

export const getMe = async (): Promise<User | null> => {
  try {
    const headers = await getCookieHeader();

    const { data } = await api.get<User>('/users/me', {
      headers,
    });

    return {
      ...data,
      id: (data as any)._id ?? data.id,
    };
  } catch {
    return null;
  }
};

export const updateProfileFormData = async (data: FormData) => {
  const res = await api.put('/users/me', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};
