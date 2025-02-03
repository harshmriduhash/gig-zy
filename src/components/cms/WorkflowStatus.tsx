import React from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface WorkflowStatusProps {
  status: 'draft' | 'in_review' | 'approved' | 'rejected';
  reviewer?: {
    name: string;
    avatar: string;
  };
  comments?: string;
}

export function WorkflowStatus({ status, reviewer, comments }: WorkflowStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'in_review':
        return {
          icon: Clock,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
          text: 'In Review'
        };
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-100 dark:bg-green-900/30',
          text: 'Approved'
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-100 dark:bg-red-900/30',
          text: 'Rejected'
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100 dark:bg-gray-700',
          text: 'Draft'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} rounded-lg p-4`}>
      <div className="flex items-center">
        <Icon className={`h-5 w-5 ${config.color} mr-2`} />
        <span className={`font-medium ${config.color}`}>{config.text}</span>
      </div>

      {reviewer && (
        <div className="mt-4 flex items-center">
          <img
            src={reviewer.avatar}
            alt={reviewer.name}
            className="h-8 w-8 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {reviewer.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Reviewer
            </p>
          </div>
        </div>
      )}

      {comments && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {comments}
          </p>
        </div>
      )}
    </div>
  );
}