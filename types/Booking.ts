export interface BookedPeriod {
  startDate: string;
  endDate: string;
}

export interface ToolBokking {
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
