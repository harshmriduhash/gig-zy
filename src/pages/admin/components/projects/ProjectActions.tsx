import React from 'react';
import { Eye, AlertTriangle, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import type { Project } from '../../../../types';

interface ProjectActionsProps {
  project: Project;
  onClose: () => void;
  onUpdateStatus: (projectId: string, status: string) => Promise<void>;
}

export function ProjectActions({ project, onClose, onUpdateStatus }: ProjectActionsProps) {
  const handleAction = async (action: string) => {
    try {
      await onUpdateStatus(project.id, action);
    } catch (error) {
      console.error('Failed to update project status:', error);
    }
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
      <div className="py-1" role="menu">
        <button
          onClick={() => handleAction('in_progress')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          role="menuitem"
        >
          <CheckCircle className="h-4 w-4 mr-3 text-green-500" />
          Mark In Progress
        </button>
        <button
          onClick={() => handleAction('disputed')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          role="menuitem"
        >
          <AlertTriangle className="h-4 w-4 mr-3 text-yellow-500" />
          Mark Disputed
        </button>
        <button
          onClick={() => handleAction('closed')}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          role="menuitem"
        >
          <XCircle className="h-4 w-4 mr-3 text-red-500" />
          Close Project
        </button>
        <hr className="my-1 border-gray-200 dark:border-gray-600" />
        <button
          onClick={onClose}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          role="menuitem"
        >
          <Eye className="h-4 w-4 mr-3" />
          View Details
        </button>
        <button
          onClick={onClose}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
          role="menuitem"
        >
          <MessageSquare className="h-4 w-4 mr-3" />
          Contact Client
        </button>
      </div>
    </div>
  );
}