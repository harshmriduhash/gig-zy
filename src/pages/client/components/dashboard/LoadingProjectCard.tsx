import React from 'react';

export function LoadingProjectCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex justify-between items-start">
        <div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
          <div className="mt-1 h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
        ))}
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-36"></div>
      </div>
    </div>
  );
}