import { api } from "./api";
import {
  ToolBokking,
  BookingResponse,
  CreateBookingRequest,
} from "@/types/Booking";

export const createBooking = async (
  bookingData: CreateBookingRequest & { userId?: string }
): Promise<BookingResponse> => {
  const payload = { ...(bookingData as CreateBookingRequest) } as Partial<
    CreateBookingRequest & { userId?: string }
  >;
  if ((payload as { userId?: string }).userId)
    delete (payload as { userId?: string }).userId;

  try {
    const response = await api.post<BookingResponse>(
      `/api/bookings`,
      payload as CreateBookingRequest
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getToolById = async (toolId: string): Promise<ToolBokking> => {
  const response = await api.get<ToolBokking>(`/tools/${toolId}`);
  return response.data;
};
