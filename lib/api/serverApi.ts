// lib/api/serverApi.ts

import { cookies } from "next/headers";
import { User } from "@/types/User";
import { Tool, ToolHttpRequest } from "@/types/Tool";
import { api } from "@/lib/api/api";

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const headers = await getCookieHeader();
    const { data } = await api.get<User>(`/users/${userId}`, { headers });
    console.log(data);
    return {
      ...data,
      id: (data as any)._id ?? data.id,
    };
  } catch (error) {
    console.warn("getUserById failed:", error);
    return null;
  }
};

export const getUserTools = async (userId: string): Promise<Tool[]> => {
  try {
    const headers = await getCookieHeader();
    const { data } = await api.get<Tool[]>(`/users/${userId}/tools`, {
      headers,
    });
    return data;
  } catch (error) {
    console.warn("getUserTools failed:", error);
    return [];
  }
};

export const getAllToolsServer = async (): Promise<ToolHttpRequest> => {
  try {
    const headers = await getCookieHeader();
    const { data } = await api.get<ToolHttpRequest>("/tools", {
      params: { perPage: 8 },
      headers,
    });
    return data;
  } catch (error) {
    console.warn("getAllToolsServer failed:", error);
    throw error;
  }
};
