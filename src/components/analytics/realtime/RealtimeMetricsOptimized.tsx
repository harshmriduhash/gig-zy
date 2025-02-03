import React from 'react';
import { Users, Activity, Clock } from 'lucide-react';
import { useRealtimeConnection } from '../../../hooks/useRealtimeConnection';
import { RealtimeStatus } from './RealtimeStatus';

export function RealtimeMetricsOptimized() {
  const { isConnected, error, retryCount, aggregatedData } = useRealtimeConnection({
    tables: ['users', 'projects', 'transactions'],
    retryAttempts: 3,
    retryDelay: 5000,
    batchSize: 10,
    batchInterval: 5000
  });

  const metrics = [
    {
      label: 'Active Users',
      value: aggregatedData?.activeUsers || 0,
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      label: 'Ongoing Projects',
      value: aggregatedData?.ongoingProjects || 0,
      icon: Activity,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      label: 'Recent Activity',
      value: aggregatedData?.recentActivity?.length || 0,
      icon: Clock,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Real-time Metrics
        </h2>
        <RealtimeStatus
          isConnected={isConnected}
          error={error}
          retryCount={retryCount}
          onRetry={() => window.location.reload()}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className={`${metric.bgColor} rounded-lg p-3`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {metric.label}
                </h3>
                <div className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                  {metric.value.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {aggregatedData?.recentActivity && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Recent Activity
            </h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {aggregatedData.recentActivity.map((activity: any) => (
              <div key={activity.id} className="p-4">
                <p className="text-sm text-gray-900 dark:text-white">
                  {activity.description}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}