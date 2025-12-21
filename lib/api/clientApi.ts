// lib/api/clientApi.ts

import { api } from './api';
import {
  BookingResponse,
  CreateBookingPayload,
  CreateBookingRequest,
  Tool,
} from '@/types/Booking';
import {
  fetchFeedbacksProps,
  fetchFeedbacksRequestProps,
} from '@/types/Feedback';
import { User, EditProfileData, EditProfileValues } from '@/types/User';
import { Category, CreateToolPayload } from '@/types/typesCategories';

export const getProfile = async (): Promise<User> => {
  try {
    const { data } = await api.get<User>('/users/me');
    return data;
  } catch (error) {
    console.error('getProfile failed:', error);
    throw new Error('Не вдалося завантажити профіль');
  }
};

export const updateProfile = async (user: EditProfileData): Promise<User> => {
  try {
    const { data } = await api.put<User>('/profile', user, {
      headers: { 'Content-Type': 'application/json' },
    });
    return data;
  } catch (error: any) {
    console.error('updateProfile failed:', error);
    throw new Error(error.response?.data?.error || 'Не вдалося оновити профіль');
  }
};

export async function updateProfileFormData(userId: string, formData: FormData) {
  try {
    const response = await api.patch<User>(`/profile/${userId}`, formData,  {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('updateProfileFormData failed:', error);
    throw new Error('Не вдалося оновити профіль');
  }
}

export const createBookingRequest = async (
  payload?: CreateBookingRequest
) => {
  try {
    const { data } = await api.post<Tool>('/booking', payload);
    return data;
  } catch (error) {
    console.error('createBookingRequest failed:', error);
    throw error;
  }
};

export const createBooking = async (bookingData: CreateBookingPayload): Promise<BookingResponse> => {
  try {
    const { userId, ...payload } = bookingData;
    const { data } = await api.post<BookingResponse>('/bookings', payload);
    return data;
  } catch (error) {
    console.error('createBooking failed:', error);
    throw new Error(`Error creating booking: ${error}`);
  }
};

export const fetchFeedbacks = async ({
  page,
  toolId,
  userId,
}: fetchFeedbacksRequestProps): Promise<fetchFeedbacksProps> => {
  try {
    const { data } = await api.get<fetchFeedbacksProps>('/feedbacks', {
      params: { page, ...(toolId && { toolId }), ...(userId && { userId }) },
    });
    return data;
  } catch (error) {
    console.error('fetchFeedbacks failed:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await api.get<Category[]>('/categories');
    return data;
  } catch (error) {
    console.error('getCategories failed:', error);
    throw error;
  }
};

export const updateTool = async (payload: { toolName?: string; photoUrl?: string }): Promise<Tool> => {
  try {
    const { data } = await api.put<Tool>('/tools', payload);
    return data;
  } catch (error) {
    console.error('updateTool failed:', error);
    throw error;
  }
};

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const { data } = await api.post('/tools', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.url;
  } catch (error) {
    console.error('uploadImage failed:', error);
    throw error;
  }
};

export const createTool = async (payload: CreateToolPayload): Promise<Tool> => {
  try {
    const { data } = await api.post<Tool>('/tools', payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return data;
  } catch (error) {
    console.error('createTool failed:', error);
    throw new Error('Failed to create tool');
  }
};

export const fetchToolById = async (toolId: string): Promise<Tool> => {
  try {
    const { data } = await api.get<Tool>(`/tools/${toolId}`);
    return data;
  } catch (error) {
    console.error('fetchToolById failed:', error);
    throw error;
  }
};

export const fetchUserById = async (userId: string): Promise<User> => {
  try {
    const { data } = await api.get<User>(`/users/${userId}`);
    return data;
  } catch (error) {
    console.error('fetchUserById failed:', error);
    throw error;
  }
};
