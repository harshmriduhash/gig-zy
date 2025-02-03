import React from 'react';
import { Clock, DollarSign, CheckCircle } from 'lucide-react';
import type { Milestone } from '../../../../types';

interface MilestoneCardProps {
  milestone: Milestone;
}

export function MilestoneCard({ milestone }: MilestoneCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not_started':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      case 'in_progress':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {milestone.description}
        </h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
          {milestone.status.replace('_', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <DollarSign className="h-5 w-5 mr-2" />
          <span>${milestone.amount}</span>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Clock className="h-5 w-5 mr-2" />
          <span>Due {new Date(milestone.due_date).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        {milestone.status === 'completed' && (
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            Release Payment
          </button>
        )}
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          View Details
        </button>
      </div>
    </div>
  );
}