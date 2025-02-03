import React from 'react';

export function LoadingBidCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>

        <div className="mt-4">
          <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
}