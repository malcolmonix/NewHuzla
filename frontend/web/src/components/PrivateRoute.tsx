import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
  const { currentUser } = useAuth();

  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute; 