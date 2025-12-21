import { User } from "../../types/User";
import { Tool } from "../../types/Tool";
import { ToolHttpRequest } from "@/types/Tool";
import { api } from "./api";

export async function getUserById(userId: string): Promise<User> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Не вдалося завантажити користувача");
  }

  const data = await res.json();
  return {
    ...data,
    id: data._id || data.id,
  };
}

export async function getUserTools(userId: string): Promise<Tool[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/tools`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export const getAllToolsServer = async (): Promise<ToolHttpRequest> => {
  const response = await api.get<ToolHttpRequest>("/tools", {
    params: {
      perPage: 8,
    },
  });
  return response.data;
};
