import { api } from "./api";
import {
  Tool,
  BookingResponse,
  CreateBookingRequest,
  CreateBookingPayload,
} from "@/types/Booking";

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

export const getToolById = async (toolId: string): Promise<Tool> => {
  const response = await api.get<Tool>(`/tools/${toolId}`);
  return response.data;
};
