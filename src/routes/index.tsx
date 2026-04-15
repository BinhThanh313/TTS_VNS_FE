import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import Login from '@/pages/auth/Login'; 

// --- CÁC MODULE ĐÃ ĐƯỢC REFACTOR XONG ---
import Province from '@/pages/Province';
import District from '@/pages/District';
import Ward from '@/pages/Ward';
import RevenueReport from '@/pages/RevenueReport'; 
import ClinicService from '@/pages/ClinicService'; 
import QueueSystem from '@/pages/QueueSystem'; // 🔥 ĐÃ SỬA: Thêm import từ thư mục Queue mới

// --- CÁC ĐƯỜNG DẪN CŨ (Sẽ refactor dần sau) ---
import HealthRecordList from '@/pages/HealthRecords/HealthRecordList';
import { HealthRecordDetail } from '@/pages/HealthRecords/HealthRecordDetail'; 

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/revenue" replace /> },
      
      // CHUẨN MỚI
      { path: 'province', element: <Province /> },
      { path: 'district', element: <District /> }, 
      { path: 'ward', element: <Ward /> }, 
      { path: 'revenue', element: <RevenueReport /> }, 
      { path: 'clinic-service', element: <ClinicService /> }, 
      { path: 'queue/test-all', element: <QueueSystem /> }, // 🔥 ĐÃ SỬA: Chuyển route này lên nhóm Chuẩn Mới

      // MODULE HỒ SƠ SỨC KHỎE (Chưa sửa)
      { path: 'health-records', element: <HealthRecordList /> },
      { path: 'health-records/:cccd', element: <HealthRecordDetail /> }, 

      { path: 'authorization', element: <div style={{padding: 20}}>Trang Quản lý ủy quyền</div> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);