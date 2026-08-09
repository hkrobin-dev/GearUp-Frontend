import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { ApiErrorShape } from "@/types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://gearup-backend-seqn.onrender.com/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT to every outgoing request
api.interceptors.request.use((config) => {
  const token = Cookies.get("gearup_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error shape so calling code can rely on { message, errorDetails }
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorShape>) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    const errorDetails = error.response?.data?.errorDetails;
    return Promise.reject({ message, errorDetails, status: error.response?.status });
  }
);

export interface ApiClientError {
  message: string;
  errorDetails?: unknown;
  status?: number;
}
