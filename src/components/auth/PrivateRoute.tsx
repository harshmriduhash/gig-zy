import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
}

export function PrivateRoute({
  children,
  requiredPermissions = [],
}: PrivateRouteProps) {
  const { user, isLoading, hasPermission } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (
    requiredPermissions.length > 0 &&
    !requiredPermissions.every(hasPermission)
  ) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
