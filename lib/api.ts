import { AxiosError } from "axios";
import { api } from "./api/api";

api.interceptors.response.use(
  (response) => response,
  async (
    error: AxiosError<{ error?: string; errors?: Array<{ msg: string }> }>
  ) => {
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),

  register: (name: string, email: string, password: string) =>
    api.post("/auth/register", { name, email, password }),

  logout: () => api.post("/auth/logout"),

  refresh: () => api.post("/auth/refresh"),

  getMe: () => api.get("/auth/me"),
};
