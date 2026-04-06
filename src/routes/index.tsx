import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import Login from '@/pages/auth/Login'; 
import {Province } from '@/pages/category/province/Province';
import { District } from '@/pages/category/district/District';
import { Ward }from '@/pages/category/ward/Ward';
import RevenueReport from '@/pages/report/RevenueReport'; 
import { ClinicService } from '@/pages/category/ClinicService/ClinicService';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Mặc định khi vào trang chủ (/) sẽ tự động chuyển hướng sang tỉnh/thành phố
      { index: true, element: <Navigate to="/province" replace /> },
      
      // Đường dẫn đã được chuẩn hóa theo folder chữ thường
      { path: 'province', element: <Province /> },
      { path: 'district', element: <District /> },
      { path: 'ward', element: <Ward /> },
      
      // Trang báo cáo
      { path: 'clinic-service', element: <ClinicService /> },
      { path: 'revenue', element: <RevenueReport /> }, 
    ],
  },
  {
    // Đường dẫn không tồn tại sẽ bị đẩy về trang đăng nhập hoặc trang chủ
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);