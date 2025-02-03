import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { AnalyticsData } from '../types';

interface MetricsGridProps {
  data: AnalyticsData;
  isLoading: boolean;
}

export function MetricsGrid({ data, isLoading }: MetricsGridProps) {
  const metrics = [
    {
      name: 'Total Revenue',
      value: `$${data.metrics.revenue.toLocaleString()}`,
      change: data.metrics.revenueChange,
      format: 'currency'
    },
    {
      name: 'Active Users',
      value: data.metrics.activeUsers.toLocaleString(),
      change: data.metrics.activeUsersChange,
      format: 'number'
    },
    {
      name: 'Project Success Rate',
      value: `${data.metrics.projectSuccessRate}%`,
      change: data.metrics.projectSuccessRateChange,
      format: 'percentage'
    },
    {
      name: 'Average Project Value',
      value: `$${data.metrics.avgProjectValue.toLocaleString()}`,
      change: data.metrics.avgProjectValueChange,
      format: 'currency'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.name} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {metric.name}
          </h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {metric.value}
            </p>
            <p className={`ml-2 flex items-center text-sm ${
              metric.change >= 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {metric.change >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(metric.change)}%
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}