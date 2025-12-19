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
    const url = originalRequest?.url || '';

    const skipRefreshUrls = ['/auth/refresh', '/auth/login', '/auth/register'];
    const shouldSkipRefresh = skipRefreshUrls.some(skipUrl => url.includes(skipUrl));

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry && !shouldSkipRefresh) {
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

  getMe: () => api.get('/users/me'),
};
