import React from 'react';

export function LoadingMilestoneCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      <div className="flex justify-end space-x-3">
        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  );
}