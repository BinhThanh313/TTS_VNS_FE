import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import Login from '@/pages/auth/Login'; 
import Province from '@/pages/Province';
import District from '@/pages/District';
import Ward from '@/pages/Ward';
import RevenueReport from '@/pages/RevenueReport'; 
import ClinicService from '@/pages/ClinicService'; 
import QueueSystem from '@/pages/QueueSystem'; 
import MedicalRecord from '@/pages/MedicalRecords';
import MedicalRecordDetail from '@/pages/MedicalRecordDetail';

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
      { path: 'queue/queue-system', element: <QueueSystem /> }, 
      { path: 'medical-records', element: <MedicalRecord /> },
      { path: 'medical-records/:cccd', element: <MedicalRecordDetail /> }, 
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);