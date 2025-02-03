import React from 'react';
import { DollarSign, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import type { PaymentStats as Stats } from './types';

interface PaymentStatsProps {
  stats: Stats;
  isLoading: boolean;
}

export function PaymentStats({ stats, isLoading }: PaymentStatsProps) {
  const statItems = [
    {
      name: 'Total Volume',
      value: `$${stats.totalVolume.toLocaleString()}`,
      change: stats.volumeChange,
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      name: 'Pending Approvals',
      value: stats.pendingCount,
      change: stats.pendingChange,
      icon: Clock,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    {
      name: 'Successful',
      value: stats.successCount,
      change: stats.successChange,
      icon: CheckCircle,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      name: 'Failed',
      value: stats.failedCount,
      change: stats.failedChange,
      icon: AlertTriangle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
            <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <div key={item.name} className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow">
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
                  {item.value}
                </p>
                <p className={`mt-1 text-sm ${
                  item.change >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {item.change >= 0 ? '+' : ''}{item.change}%
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}