import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import Login from '../pages/auth/Login';
import ProvincePage from '../pages/category/Province/Province';
import DistrictPage from '../pages/category/District/District';
import WardPage from '../pages/category/Ward/Ward';
import RevenueReport from '../pages/report/RevenueReport'; 

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
      { path: 'province', element: <ProvincePage /> },
      { path: 'district', element: <DistrictPage /> },
      { path: 'ward', element: <WardPage /> },
      
      // 2. KHAI BÁO THÊM ĐƯỜNG DẪN CHO TRANG BÁO CÁO
      { path: 'revenue', element: <RevenueReport /> }, 
    ],
  },
  {
    // Đường dẫn "rác" (không tồn tại) sẽ bị đá về trang đăng nhập
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);