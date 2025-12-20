import { api } from "./api";
import { Tool, BookingResponse, CreateBookingRequest } from "@/types/Booking";

export const createBooking = async (
  bookingData: CreateBookingRequest & { userId?: string }
): Promise<BookingResponse> => {
  const payload: CreateBookingRequest = {
    ...(bookingData as CreateBookingRequest),
  };

  delete (payload as any).userId;

  const response = await api.post<BookingResponse>(
    `/${payload.toolId}/bookings`,
    payload
  );

  return response.data;
};

export const getToolById = async (toolId: string): Promise<Tool> => {
  const response = await api.get<Tool>(`/tools/${toolId}`);
  return response.data;
};
