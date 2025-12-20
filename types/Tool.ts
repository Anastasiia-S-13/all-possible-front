import { BookingResponse } from "./Booking";
import { Feedback } from "./Feedback";
import { User } from "./User";

export type Tool = {
  _id: string;
  owner: User['id'];
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
