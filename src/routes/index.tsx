import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import Login from '../pages/Login';
import ProvincePage from '../pages/Province';
import DistrictPage from '../pages/District';
import WardPage from '../pages/Ward';
import RevenueReport from '../pages/RevenueReport'; 

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