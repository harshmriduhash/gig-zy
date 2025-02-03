import React from 'react';
import { Activity, Wifi, AlertTriangle } from 'lucide-react';
import { useMonitoring } from '../../hooks/useMonitoring';
import { LineChart } from '../analytics/charts/LineChart';
import { PieChart } from '../analytics/charts/PieChart';

export function MonitoringDashboard() {
  const { performance, connections, errors, isLoading, error } = useMonitoring();

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">
          Error loading monitoring data: {error.message}
        </p>
      </div>
    );
  }

  const performanceMetrics = [
    {
      label: 'Response Time',
      value: `${performance.responseTime.toFixed(2)}ms`,
      icon: Activity,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      label: 'Throughput',
      value: `${performance.throughput}/s`,
      icon: Activity,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      label: 'Error Rate',
      value: `${(performance.errorRate * 100).toFixed(2)}%`,
      icon: AlertTriangle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30'
    }
  ];

  const connectionMetrics = [
    {
      label: 'Active Connections',
      value: connections.activeConnections,
      icon: Wifi,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/30'
    },
    {
      label: 'Average Latency',
      value: `${connections.averageLatency.toFixed(2)}ms`,
      icon: Activity,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      label: 'Connection Errors',
      value: connections.connectionErrors,
      icon: AlertTriangle,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Performance Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {performanceMetrics.map((metric) => (
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
                    {isLoading ? (
                      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    ) : (
                      metric.value
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connection Analytics */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Connection Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {connectionMetrics.map((metric) => (
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
                    {isLoading ? (
                      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    ) : (
                      metric.value
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error Tracking */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Error Tracking
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Error Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">
              Errors by Type
            </h3>
            <div className="h-64">
              <PieChart
                data={Object.entries(errors.errorsByType).map(([type, count]) => ({
                  label: type,
                  value: count,
                  color: `#${Math.floor(Math.random()*16777215).toString(16)}`
                }))}
                size={200}
              />
            </div>
          </div>

          {/* Recent Errors */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-base font-medium text-gray-900 dark:text-white">
                Recent Errors
              </h3>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {errors.recentErrors.map((error) => (
                <div key={error.id} className="p-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {error.type}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {error.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                        {new Date(error.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}