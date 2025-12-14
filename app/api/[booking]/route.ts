import { BookingResponse, CreateBookingRequest } from "@/type/Booking";
import { api } from "@/lib/api/api";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";

type Props = {
  params: Promise<{ toolId: string }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { toolId } = await params;

    const res = await api(`/Tool/${toolId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const createBooking = async (
  bookingData: CreateBookingRequest & { userId: string }
): Promise<BookingResponse> => {
  try {
    const cookieStore = await cookies();
    const response = await api.post(`/bookings`, bookingData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to create booking"
      );
    }
    throw new Error("Failed to create booking");
  }
};
