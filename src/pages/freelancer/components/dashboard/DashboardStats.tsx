import React from 'react';
import { DollarSign, Clock, CheckCircle, Star } from 'lucide-react';
import type { Bid, Contract } from '../../../../types';

interface DashboardStatsProps {
  bids: Bid[];
  contracts: Contract[];
}

export function DashboardStats({ bids, contracts }: DashboardStatsProps) {
  const stats = [
    {
      name: 'Active Bids',
      value: bids.filter(b => b.status === 'pending').length,
      icon: Clock,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      name: 'Active Contracts',
      value: contracts.filter(c => c.status === 'active').length,
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      name: 'Total Earnings',
      value: `$${contracts.reduce((acc, c) => acc + (c.total_paid || 0), 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    {
      name: 'Success Rate',
      value: '98%',
      icon: Star,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className={`${stat.bgColor} rounded-md p-3`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {stat.name}
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}