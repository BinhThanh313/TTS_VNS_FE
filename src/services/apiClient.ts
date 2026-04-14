// src/services/apiClient.ts
import axios from "axios";
import { PUBLIC_BASE_API_URL } from "@/constants";

export const safeApiClient = axios.create({
  baseURL: PUBLIC_BASE_API_URL,
  headers: { "Content-Type": "application/json" },
});

safeApiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);


