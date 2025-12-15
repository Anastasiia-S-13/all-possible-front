// lib/api/clientApi.ts
import { BookingResponse, CreateBookingRequest, Tool } from "@/types/Booking";
import { AxiosRequestConfig } from "axios";
import { api } from "./api";
import { User,  EditProfileData} from '../../types/User';
import { fetchFeedbacksProps } from "@/type/Feedback";

export async function getProfile(): Promise<User> {
  const res = await fetch('/api/profile');
  if (!res.ok) throw new Error('Не вдалося завантажити профіль');
  return res.json();
}

export async function updateProfile(user: EditProfileData) {
  const res = await fetch('/api/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Не вдалося оновити профіль');
  }

  return res.json();
}
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
