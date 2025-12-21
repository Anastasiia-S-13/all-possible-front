import {
  BookingResponse,
  CreateBookingPayload,
  CreateBookingRequest,
} from "@/types/Booking";
import { Category } from "@/types/Tool";
import { AxiosRequestConfig } from "axios";
import { api } from "./api";
import {
  fetchFeedbacksProps,
  fetchFeedbacksRequestProps,
} from "@/types/Feedback";
import { User, EditProfileData } from "@/types/User";


import {
  CreateToolPayload,
  ToolCreate,
  ToolsCategory,
} from "@/types/typesCategories";
import { Tool } from "@/types/Tool";

export async function fetchFeedbacks({
  page,
  toolId,
  userId,
}: fetchFeedbacksRequestProps): Promise<fetchFeedbacksProps> {
  const request = await api.get<fetchFeedbacksProps>("/feedbacks", {
    params: {
      page,
      ...(toolId && { toolId }),
      ...(userId && { userId }),
    },
  });
  return request.data;
}

export const getCategories = async () => {
  const res = await api.get<ToolsCategory[]>("/categories");
  return res.data;
};


export const updateTool = async (
  id: string,
  formData: FormData
): Promise<ToolCreate> => {
  const res = await api.put<ToolCreate>(`/tools/${id}`, formData, {
       headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/tools", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export async function createTool(formData: FormData): Promise<ToolCreate> {
  const { data } = await api.post<ToolCreate>("/tools", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}

export async function getTool(id: string): Promise<ToolCreate> {
  const { data } = await api.get<ToolCreate>(`/tools/${id}`);
  return data;
}

export const fetchToolById = async (toolId: string): Promise<Tool> => {
  const response = await api.get<Tool>(`/tools/${toolId}`);
  console.log(response.data.images);
  return response.data;
};

export const fetchUserById = async (userId: string): Promise<User> => {
  const response = await api.get<User>(`/users/${userId}`);
  return response.data;
};

export const getAllTools = async (params: {
  search?: string;
  category?: string;
  page?: number;
  perPage?: number;
}): Promise<{ tools: Tool[]; total: number; pages: number }> => {
  const response = await api.get("/tools", { params });
  return response.data;
};

export const updateTool = async (
  toolId: string,
  data: FormData
): Promise<Tool> => {
  const response = await api.patch<Tool>(`/tools/${toolId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
