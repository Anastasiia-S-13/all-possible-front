export interface Feedback {
  _id: string;
  name: string;
  description: string;
  rate: number;
  toolId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface fetchFeedbacksRequestProps {
  page: number;
  toolId?: string;
  userId?: string;
}

export interface fetchFeedbacksProps {
  feedbacks: Feedback[];
  page: number;
  totalPages: number;
  toolId?: string;
  userId?: string;
}
