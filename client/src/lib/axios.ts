import { authStorage } from "@/features/auth";
import Axios, { type AxiosRequestConfig } from 'axios';

export const api = Axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000,
});

export const apiClient = Axios.create({
  baseURL: "https://express-inventory-system-uhrv.onrender.com",
  // baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000,
});

export const axiosInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return apiClient(config).then((res) => res.data);
};

apiClient.interceptors.request.use((config) => {
  const token = authStorage.getToken();

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
