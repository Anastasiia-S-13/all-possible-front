// lib/api/clientApi.ts

import { api } from "./api";
import { AxiosRequestConfig } from "axios";
import { User} from "@/types/User";
import {
  BookingResponse,
  CreateBookingPayload,
  CreateBookingRequest,
} from "@/types/Booking";
import { Category, Tool } from "@/types/Tool";
import {
  fetchFeedbacksProps,
  fetchFeedbacksRequestProps,
} from "@/types/Feedback";
import { CreateToolPayload } from "@/types/typesCategories";

export const fetchUserById = async (userId: string): Promise<User> => {
  const response = await api.get<User>(`/users/${userId}`);
  return response.data;
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

export const createTool = async (payload: CreateToolPayload): Promise<Tool> => {
  try {
    const { data } = await api.post<Tool>("/tools", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error: any) {
    console.error("createTool failed:", error);
    throw new Error(error.response?.data?.error || "Не вдалося створити інструмент");
  }
};

export const fetchToolById = async (toolId: string): Promise<Tool> => {
  const response = await api.get<Tool>(`/tools/${toolId}`);
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
  try {
    const response = await api.patch<Tool>(`/tools/${toolId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error: any) {
    console.error("updateTool failed:", error);
    throw new Error(error.response?.data?.error || "Не вдалося оновити інструмент");
  }
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/tools", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.url;
};

export const createBookingRequest = async (
  payload?: CreateBookingRequest,
  config?: AxiosRequestConfig
) => {
  const response = await api.post<Tool>("/booking", payload, { ...config });
  return response.data;
};

export const createBooking = async (
  bookingData: CreateBookingPayload & { userId: string }
): Promise<BookingResponse> => {
  try {
    const { userId, ...payload } = bookingData;
    const response = await api.post(`/bookings`, payload);
    return response.data;
  } catch (error: any) {
    console.error("createBooking failed:", error);
    throw new Error(error.response?.data?.error || "Не вдалося створити бронювання");
  }
};

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

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get<Category[]>("/categories");
  return res.data;
};
