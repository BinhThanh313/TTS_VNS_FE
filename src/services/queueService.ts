import type { IPatient } from "@/types";

export const queueService = {
  // Giả lập lấy danh sách ban đầu để React Query khởi tạo Cache
  getInitialQueue: async (roomId: string): Promise<IPatient[]> => {
    return []; 
  },
};