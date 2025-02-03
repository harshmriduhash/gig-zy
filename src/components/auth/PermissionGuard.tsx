import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface PermissionGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  permissions: string[];
  requireAll?: boolean;
}

export function PermissionGuard({ 
  children, 
  fallback = null, 
  permissions, 
  requireAll = true 
}: PermissionGuardProps) {
  const { hasPermission } = useAuth();

  const hasAccess = requireAll
    ? permissions.every(permission => hasPermission(permission))
    : permissions.some(permission => hasPermission(permission));

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}