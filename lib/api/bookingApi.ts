import { api } from "./api";
import { Tool, BookingResponse, CreateBookingRequest } from "@/types/Booking";

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
    console.error("createBooking failed:", error);
    throw error;
  }
};

export const getToolById = async (toolId: string): Promise<Tool> => {
  const response = await api.get<Tool>(`/tools/${toolId}`);
  return response.data;
};
