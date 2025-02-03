import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { ComparisonData } from '../../../hooks/useComparisonAnalytics';

interface ComparisonMetricsProps {
  data: ComparisonData;
  isLoading: boolean;
  error: Error | null;
  comparisonLabel: string;
}

export function ComparisonMetrics({ data, isLoading, error, comparisonLabel }: ComparisonMetricsProps) {
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">
          Error loading comparison data: {error.message}
        </p>
      </div>
    );
  }

  const metrics = [
    {
      label: 'Revenue',
      current: data.current.revenue,
      previous: data.comparison.revenue,
      change: data.changes.revenue,
      format: (value: number) => `$${value.toLocaleString()}`
    },
    {
      label: 'Users',
      current: data.current.users,
      previous: data.comparison.users,
      change: data.changes.users,
      format: (value: number) => value.toLocaleString()
    },
    {
      label: 'Projects',
      current: data.current.projects,
      previous: data.comparison.projects,
      change: data.changes.projects,
      format: (value: number) => value.toLocaleString()
    },
    {
      label: 'Transactions',
      current: data.current.transactions,
      previous: data.comparison.transactions,
      change: data.changes.transactions,
      format: (value: number) => value.toLocaleString()
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {metric.label}
          </h3>
          
          {isLoading ? (
            <div className="space-y-2 mt-2">
              <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          ) : (
            <>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {metric.format(metric.current)}
              </p>
              
              <div className="mt-2 flex items-center text-sm">
                <span className={`flex items-center ${
                  metric.change > 0
                    ? 'text-green-600 dark:text-green-400'
                    : metric.change < 0
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {metric.change > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : metric.change < 0 ? (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  ) : null}
                  {Math.abs(metric.change).toFixed(1)}%
                </span>
                <span className="mx-2 text-gray-500 dark:text-gray-400">vs</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {metric.format(metric.previous)}
                </span>
              </div>
              
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {comparisonLabel}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}