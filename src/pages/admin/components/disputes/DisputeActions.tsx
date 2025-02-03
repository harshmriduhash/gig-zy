import React from 'react';
import { CheckCircle, AlertTriangle, Ban, MessageSquare } from 'lucide-react';
import type { Dispute } from './types';

interface DisputeActionsProps {
  dispute: Dispute;
  onClose: () => void;
  onUpdateStatus: (disputeId: string, status: string) => Promise<void>;
}

export function DisputeActions({ dispute, onClose, onUpdateStatus }: DisputeActionsProps) {
  const handleAction = async (status: string) => {
    try {
      await onUpdateStatus(dispute.id, status);
    } catch (error) {
      console.error('Failed to update dispute status:', error);
    }
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu">
        <button
          onClick={() => handleAction('in_review')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          role="menuitem"
        >
          <AlertTriangle className="h-4 w-4 mr-3 text-yellow-500" />
          Mark In Review
        </button>
        <button
          onClick={() => handleAction('resolved')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          role="menuitem"
        >
          <CheckCircle className="h-4 w-4 mr-3 text-green-500" />
          Mark Resolved
        </button>
        <button
          onClick={() => handleAction('escalated')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          role="menuitem"
        >
          <Ban className="h-4 w-4 mr-3 text-red-500" />
          Escalate
        </button>
        <hr className="my-1 border-gray-200 dark:border-gray-600" />
        <button
          onClick={onClose}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          role="menuitem"
        >
          <MessageSquare className="h-4 w-4 mr-3" />
          Contact Parties
        </button>
      </div>
    </div>
  );
}