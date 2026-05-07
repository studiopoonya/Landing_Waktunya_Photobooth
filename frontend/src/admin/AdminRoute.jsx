import { Navigate } from 'react-router-dom';
import { getToken } from './adminApi';

export default function AdminRoute({ children }) {
  return getToken() ? children : <Navigate to="/admin/login" replace />;
}
