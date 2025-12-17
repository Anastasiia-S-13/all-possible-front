import { BookingResponse, CreateBookingRequest, Tool } from "@/types/Booking";
import { AxiosRequestConfig } from "axios";
import { api } from "./api";
import {
  fetchFeedbacksProps,
  fetchFeedbacksRequestProps,
} from "@/types/Feedback";

export const createBookingRequest = async (
  payload?: CreateBookingRequest,
  config?: AxiosRequestConfig
) => {
  const response = await api.post<Tool>("/booking", payload, { ...config });
  return response.data;
};

export const createBooking = async (
  bookingData: CreateBookingRequest & { userId: string }
): Promise<BookingResponse> => {
  try {
    const response = await api.post(`/bookings`, { ...bookingData });
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
