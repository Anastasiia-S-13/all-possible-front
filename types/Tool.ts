export type Tool = {
  _id: string;
  name: string;
  images: string;
  pricePerDay: number;
  rating?: number;
};

export interface ToolHttpRequest {
  tools: Tool[];
}
