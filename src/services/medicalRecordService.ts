import { safeApiClient } from "./apiClient";
import type { IMedicalRecordParams, IMedicalRecordResponse, IMedicalRecord } from "@/types";

export const medicalRecordService = {
  getList: (params?: IMedicalRecordParams): Promise<IMedicalRecordResponse> =>
    safeApiClient.get("/v1/medical-records", { params }),

  getById: (cccd: string): Promise<IMedicalRecord> =>
    safeApiClient.get(`/v1/medical-records/${cccd}`),
};