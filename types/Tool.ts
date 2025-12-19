import { BookingResponse } from "./Booking";
import { Feedback } from "./Feedback";
import { User } from "./User";

export type Tool = {
  _id: string;
  owner: User['_id'];
  name: string;
  description: string;
  pricePerDay: number;
  images: string;
  rating: number;
  specifications: Record<string, string>;
  rentalTerms: string,
  bookedDates: BookingResponse[];
  feedBacks: Feedback[];
};

export interface ToolHttpRequest {
  tools: Tool[];
}

export interface Category {
  _id: string;
  name: string;
}

export interface UpdateToolData {
  name?: string;
  pricePerDay?: number;
  category?: string;
  description?: string;
  rentalTerms?: string;
  specifications?: string;
  image?: File;
}
