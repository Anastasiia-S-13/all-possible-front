export interface Category {
  _id: string;
  title: string;
  description: string;
  keywords: string;
}

export interface Tool {
  _id: string;
  owner: string;
  category: string;
  name: string;
  description: string;
  pricePerDay: number;
  images: string;
  rating: number;
  specifications: Record<string, string>;
  rentalTerms: string;
  bookedDates: string[];
  feedbacks: string[];
}

export interface AddEditToolFormRes {
  name: string;
  category: string;
  description: string;
  pricePerDay: number;
  images: string;
  specificationsText: string;
  rentalTerms: string;
}

export interface CreateToolPayload {
  name: string;
  category: string;
  description: string;
  pricePerDay: number;
  images: string;
  specifications?: Record<string, string>;
  rentalTerms?: string;
}
