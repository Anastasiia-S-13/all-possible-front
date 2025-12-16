import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ error?: string; errors?: Array<{ msg: string }> }>) => {
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await api.post('/auth/refresh');
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),

  logout: () => api.post('/auth/logout'),

  refresh: () => api.post('/auth/refresh'),

  getMe: () => api.get('/auth/me'),
};
