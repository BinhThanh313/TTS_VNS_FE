import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import Login from '@/pages/auth/Login'; 
import { Province } from '@/pages/category/Province/Province';
import { District } from '@/pages/category/District/District';
import { Ward }from '@/pages/category/Ward/Ward';
import RevenueReport from '@/pages/report/RevenueReport'; 
import { ClinicService } from '@/pages/category/ClinicService/ClinicService';
import { AllInOneTest } from '@/pages/queue/AllInOneTest';
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
      { index: true, element: <Navigate to="/dashboard" replace /> }, // Nên set mặc định về trang nào đó khi vào '/'
      
      { path: 'province', element: <Province /> },
      { path: 'district', element: <District /> },
      { path: 'ward', element: <Ward /> },

      { path: 'clinic-service', element: <ClinicService /> },
      { path: 'revenue', element: <RevenueReport /> }, 

      { path: 'queue/test-all', element: <AllInOneTest /> },

      { path: 'dashboard', element: <div style={{padding: 20}}>Trang Dashboard</div> },
      { path: 'system', element: <div style={{padding: 20}}>Trang Quản trị hệ thống</div> },
      { path: 'accounts', element: <div style={{padding: 20}}>Trang Quản lý tài khoản</div> },
      { path: 'categories', element: <div style={{padding: 20}}>Trang Danh mục dùng chung</div> },
      { path: 'reports', element: <div style={{padding: 20}}>Trang Báo cáo</div> },
      
      // ==========================================
      // MODULE HỒ SƠ SỨC KHỎE
      // ==========================================
      { path: 'health-records', element: <HealthRecordList /> },
      { path: 'health-records/:cccd', element: <HealthRecordDetail /> }, // THÊM DÒNG NÀY ĐỂ XEM CHI TIẾT
      // ==========================================

      { path: 'authorization', element: <div style={{padding: 20}}>Trang Quản lý ủy quyền</div> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);