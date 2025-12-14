import { BookingResponse, CreateBookingRequest, Tool } from "@/type/Booking";
import { AxiosRequestConfig } from "axios";
import { api } from "./api";

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
