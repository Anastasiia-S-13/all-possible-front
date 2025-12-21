export interface ToolsCategory {
  _id: string;
  title: string;
}

export interface ToolCreate {
  _id: string;
  owner: string;
  category: string;
  name: string;
  description: string;
  pricePerDay: number;
  images: string;
  rating: number;
  specifications: Record<string, string> | string;
  rentalTerms: string;
  bookedDates: {
    startDate: string;
    endDate: string;
  }[];
  feedbacks: string[];
}

export interface AddEditToolFormRes {
  name: string;
  pricePerDay: string;
  category: string;
  description: string;
  rentalTerms: string;
  specifications: string;
  image: File | null;
}

export interface CreateToolPayload {
  name: string;
  pricePerDay: string;
  categoryId: string;
  description: string;
  rentalTerms: string;
  specifications: string;
  imageUrl?: string;
}
