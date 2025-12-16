import axios from "axios";
import { Category, Tool } from "@/types/typesCategories";

export const getCategories = async () => {
  const res = await axios.get<Category[]>("/categories");
  return res.data;
};

// оновлює фото інструмнта при створенні

export type UpdateToolRequest = {
  toolName?: string;
  photoUrl?: string;
};

export const updateTool = async (payload: UpdateToolRequest) => {
  const res = await axios.put<Tool>("/tools", payload);
  return res.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axios.post("/upload", formData);
  return data.url;
};
