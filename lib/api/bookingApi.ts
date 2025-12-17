import { api } from "./api";
import { Tool, BookingResponse, CreateBookingRequest } from "@/types/Booking";

export const createBooking = async (
  bookingData: CreateBookingRequest & { userId: string }
): Promise<BookingResponse> => {
  const response = await api.post<BookingResponse>(
    `/${bookingData.toolId}/bookings`,
    bookingData
  );

  return response.data;
};

export const getToolById = async (toolId: string): Promise<Tool> => {
  const response = await api.get<Tool>(`/tools/${toolId}`);
  return response.data;
};
