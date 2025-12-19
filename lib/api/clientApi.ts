import {
  BookingResponse,
  CreateBookingPayload,
  CreateBookingRequest,
} from "@/types/Booking";
import { Tool } from "@/types/Tool";
import { AxiosRequestConfig } from "axios";
import { api } from "./api";
import {
  fetchFeedbacksProps,
  fetchFeedbacksRequestProps,
} from "@/types/Feedback";
import { User, EditProfileData } from "@/types/User";

import { Category, CreateToolPayload } from "@/types/typesCategories";

export const createBookingRequest = async (
  payload?: CreateBookingRequest,
  config?: AxiosRequestConfig
) => {
  const response = await api.post<Tool>("/booking", payload, { ...config });

  return response.data;
};

export const createBooking = async (
  bookingData: CreateBookingPayload
): Promise<BookingResponse> => {
  try {
    const { userId, ...payload } = bookingData;
    const response = await api.post(`/bookings`, payload);

    return response.data;
  } catch (error) {
    throw new Error(`Error creating booking: ${error}`);
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

export const getCategories = async () => {
  const res = await api.get<Category[]>("/categories");
  return res.data;
};

export type UpdateToolRequest = {
  toolName?: string;
  photoUrl?: string;
};

export const updateTool = async (payload: UpdateToolRequest) => {
  const res = await api.put<Tool>("/tools", payload);
  return res.data;
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/tools", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data.url;
};

export const createTool = async (payload: CreateToolPayload) => {
  try {
    const { data } = await api.post<Tool>("/tools", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error("Failed to create tool:", error);
    throw new Error("Failed to create tool");
  }
};

export const fetchToolById = async (toolId: string): Promise<Tool> => {
  const response = await api.get<Tool>(`/tools/${toolId}`);
  return response.data;
};

export const fetchUserById = async (userId: string): Promise<User> => {
  const response = await api.get<User>(`/users/${userId}`);
  console.log(response.data);
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
