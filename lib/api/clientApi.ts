import { api } from "./api";
import { AxiosRequestConfig } from "axios";
import { User } from "@/types/User";
import {
  BookingResponse,
  CreateBookingPayload,
  CreateBookingRequest,
} from "@/types/Booking";
import { Category, Tool } from "@/types/Tool";
import {
  CreateNewFeedback,
  Feedback,
  FeedbackFormModalProps,
  fetchFeedbacksProps,
  fetchFeedbacksRequestProps,
} from "@/types/Feedback";
import {
  CreateToolPayload,
  ToolCreate,
  ToolsCategory,
} from "@/types/typesCategories";

export const fetchUserById = async (userId: string): Promise<User> => {
  const response = await api.get<User>(`/users/${userId}`);
  return response.data;
};

export const updateProfileFormData = async (formData: FormData) => {
  const { data } = await api.patch("/users/me/edit", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const fetchToolById = async (toolId: string): Promise<Tool> => {
  const response = await api.get<Tool>(`/tools/${toolId}`);
  console.log(response.data.images);
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

export async function createTool(formData: FormData): Promise<ToolCreate> {
  const { data } = await api.post<ToolCreate>("/tools", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

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

  const response = await api.post<{ url: string }>("/tools/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.url;
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
  const { userId, ...payload } = bookingData;
  const response = await api.post(`/bookings`, payload);
  return response.data;
};

export async function fetchFeedbacks({
  page,
  toolId,
  userId,
  ownerId,
}: fetchFeedbacksRequestProps): Promise<fetchFeedbacksProps> {
  const request = await api.get<fetchFeedbacksProps>("/feedbacks", {
    params: {
      page,
      ...(toolId && { toolId }),
      ...(userId && { userId }),
      ...(ownerId && { ownerId }),
    },
  });
  return request.data;
}

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get<Category[]>("/categories");
  return res.data;
};

export const deleteTool = async (toolId: string): Promise<void> => {
  await api.delete(`/tools/${toolId}`);
};

export async function createNewFeedBack(
  { name, description, rate }: CreateNewFeedback,
  { toolId }: FeedbackFormModalProps
): Promise<Feedback> {
  const postFeedBack = await api.post<Feedback>(`/tools/${toolId}/feedback`, {
    name,
    description,
    rate,
  });
  return postFeedBack.data;
}
