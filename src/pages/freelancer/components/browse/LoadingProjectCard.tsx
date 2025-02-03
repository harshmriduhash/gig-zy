import React from 'react';

export function LoadingProjectCard() {
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

        <div className="space-y-3 mt-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            ))}
          </div>
          <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
}