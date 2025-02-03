import React from 'react';
import { DollarSign, Clock, CheckCircle, Star } from 'lucide-react';

interface DashboardStatsProps {
  stats: {
    activeProjects: number;
    totalEarnings: number;
    completedProjects: number;
    averageRating: number;
  };
  isLoading: boolean;
  error: Error | null;
}

export function DashboardStats({ stats, isLoading, error }: DashboardStatsProps) {
  const statItems = [
    {
      name: 'Active Projects',
      value: stats.activeProjects,
      icon: Clock,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      name: 'Total Earnings',
      value: `$${stats.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      name: 'Completed Projects',
      value: stats.completedProjects,
      icon: CheckCircle,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      name: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    }
  ];

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">
          Error loading dashboard stats: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <div
          key={item.name}
          className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className={`${item.bgColor} rounded-md p-3`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {item.name}
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                  {isLoading ? (
                    <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  ) : (
                    item.value
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}