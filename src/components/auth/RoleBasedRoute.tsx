import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  fallbackPath?: string;
}

export function RoleBasedRoute({ 
  children, 
  requiredPermissions = [], 
  fallbackPath = '/' 
}: RoleBasedRouteProps) {
  const { user, hasPermission, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasRequiredPermissions = requiredPermissions.every(permission => 
    hasPermission(permission)
  );

  if (!hasRequiredPermissions) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
}