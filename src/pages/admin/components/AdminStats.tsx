import React from 'react';
import { Users, DollarSign, Briefcase, AlertTriangle } from 'lucide-react';
import { useAdminStats } from '../../../hooks/useAdminStats';

export function AdminStats() {
  const { stats, isLoading } = useAdminStats();

  const statItems = [
    {
      name: 'Total Users',
      value: stats?.totalUsers || 0,
      change: stats?.userGrowth || 0,
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      name: 'Platform Revenue',
      value: `$${(stats?.totalRevenue || 0).toLocaleString()}`,
      change: stats?.revenueGrowth || 0,
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      name: 'Active Projects',
      value: stats?.activeProjects || 0,
      change: stats?.projectGrowth || 0,
      icon: Briefcase,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      name: 'Open Disputes',
      value: stats?.openDisputes || 0,
      change: stats?.disputeChange || 0,
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
        <div key={item.name} className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6">
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