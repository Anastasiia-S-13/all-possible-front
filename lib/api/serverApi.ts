import { ToolHttpRequest } from "@/types/Tool";
import { api } from "./api";

export const getAllToolsServer = async (): Promise<ToolHttpRequest> => {
  const response = await api.get<ToolHttpRequest>("/tools", {
    params: {
      perPage: 8,
    },
  });
  return response.data;
};
