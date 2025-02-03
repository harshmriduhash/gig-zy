import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ChartContainerProps {
  title: string;
  icon: LucideIcon;
  isLoading: boolean;
  children: React.ReactNode;
}

export function ChartContainer({ title, icon: Icon, isLoading, children }: ChartContainerProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
        </div>
      ) : (
        <div className="h-64">
          {children}
        </div>
      )}
    </div>
  );
}