import React from 'react';
import { Shield, Ban, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import type { User } from '../../../../types';

interface UserActionsProps {
  user: User;
  onClose: () => void;
  onUpdateStatus: (userId: string, status: string) => Promise<void>;
}

export function UserActions({ user, onClose, onUpdateStatus }: UserActionsProps) {
  const handleAction = async (action: string) => {
    try {
      await onUpdateStatus(user.id, action);
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu">
        <button
          onClick={() => handleAction('active')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          role="menuitem"
        >
          <CheckCircle className="h-4 w-4 mr-3 text-green-500" />
          Activate
        </button>
        <button
          onClick={() => handleAction('suspended')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          role="menuitem"
        >
          <AlertTriangle className="h-4 w-4 mr-3 text-yellow-500" />
          Suspend
        </button>
        <button
          onClick={() => handleAction('banned')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          role="menuitem"
        >
          <Ban className="h-4 w-4 mr-3 text-red-500" />
          Ban
        </button>
        <hr className="my-1 border-gray-200 dark:border-gray-600" />
        <button
          onClick={onClose}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          role="menuitem"
        >
          <Eye className="h-4 w-4 mr-3" />
          View Profile
        </button>
        <button
          onClick={onClose}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          role="menuitem"
        >
          <Shield className="h-4 w-4 mr-3" />
          Manage Roles
        </button>
      </div>
    </div>
  );
}