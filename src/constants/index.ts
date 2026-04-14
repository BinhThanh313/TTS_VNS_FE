export const PUBLIC_BASE_API_URL = import.meta.env.VITE_BASE_API_URL ?? "";
export const PUBLIC_MINIO_URL = import.meta.env.VITE_MINIO_URL ?? "/";
export const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_URL ?? "http://localhost:3000";

export const DEFAULT_PAGE_SIZE = 15;
export const PAGE_SIZE_OPTIONS = ["5", "10", "15", "20", "50", "100"];