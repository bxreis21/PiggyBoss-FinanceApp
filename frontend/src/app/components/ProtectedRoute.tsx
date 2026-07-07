import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider.js';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth) {
    return <Navigate to="/account/login" replace />;
  }

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  if (!auth.userInfo) {
    return <Navigate to="/account/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
