import { BookingResponse, CreateBookingPayload, CreateBookingRequest} from "@/types/Booking";
import { AxiosRequestConfig } from "axios";
import { api } from "./api";
import {
  fetchFeedbacksProps,
  fetchFeedbacksRequestProps,
} from "@/types/Feedback";
import { User } from "@/types/User";
import { Tool } from "@/types/Tool";

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

export const fetchToolById = async (toolId: string): Promise<Tool> => {
  const response = await api.get<Tool>(`/tools/${toolId}`);
  console.log(response.data.images);
  return response.data;
}

export const fetchUserById = async (userId: string): Promise<User> => {
  const response = await api.get<User>(`/users/${userId}`);
  console.log(response.data);
  return response.data;
}