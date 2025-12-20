export interface Category {
  _id: string;
  title: string;
  description: string;
  keywords: string;
}

export interface ToolCreate {
  _id: string;
  owner: string;
  category: string;
  name: string;
  description: string;
  pricePerDay: number;
  images: string; //https://ftp.goit.study/img/tools-next/692db3ffab59e437964311d4.webp,
  rating: number;
  specifications: string | Record<string, unknown>;
  rentalTerms: string;
  bookedDates: string[];
  feedbacks: string[];
}

export interface AddEditToolFormRes {
  name: string;
  category: string;
  description: string;
  pricePerDay: string | number;
  image: File | null;
  specifications: string;
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
