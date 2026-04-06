import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { SocketProvider } from './context/SocketContext'; // Import Provider

export default function App() {
  return (
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  );
}