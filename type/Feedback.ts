export interface Feedback {
  _id: string;
  name: string;
  description: string;
  rate: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface fetchFeedbacksProps {
  feedbacks: Feedback[];
  page: number;
  totalPages: number;
}
