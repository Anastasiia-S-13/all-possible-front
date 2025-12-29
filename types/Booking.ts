export interface BookedPeriod {
  startDate: string;
  endDate: string;
}

export interface Tool {
  _id: string;
  owner: string;
  name: string;
  pricePerDay: number;
  description?: string;
  category?: string;
  images?: string;
  rentalTerms?: string;
  specifications?: Record<string, string>;
  bookedPeriods: BookedPeriod[];
  bookedDates?: BookedPeriod[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  deliveryCity: string;
  novaPoshtaBranch: string;
}

export interface CreateBookingRequest extends BookingFormData {
  toolId: string;
  startDate: string;
  endDate: string;
}

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface BookingResponse {
  success: boolean;
  message?: string;
  booked: {
    rentalPeriod: {
      startDate: string;
      endDate: string;
    };
  };
  booking?: {
    id: string;
    toolId: string;
    userId: string;
    startDate: string;
    endDate: string;
    createdAt: string;
  };
}

export type CreateBookingPayload = CreateBookingRequest & {
  userId?: string;
};


export interface UserBooking {
  id: string;
  toolId: string;
  toolName: string;
  toolImage?: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed';
  deliveryCity: string;
  novaPoshtaBranch: string;
  createdAt: string;
}

export interface UserBookingsResponse {
  success: boolean;
  count: number;
  bookings: UserBooking[];
  message?: string;
}


