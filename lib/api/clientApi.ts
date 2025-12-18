import {
  BookingResponse,
  CreateBookingPayload,
  CreateBookingRequest,
  Tool,
} from "@/types/Booking";
import { AxiosRequestConfig } from "axios";
import { api } from "./api";
import { fetchFeedbacksProps } from "@/type/Feedback";

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

export async function fetchFeedbacks(
  page: number
): Promise<fetchFeedbacksProps> {
  const request = await api.get<fetchFeedbacksProps>("/feedbacks", {
    params: {
      page,
    },
  });
  return request.data;
}
