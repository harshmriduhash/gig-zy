import React from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

export function RecentEarnings() {
  const earnings = [
    {
      id: '1',
      project: 'AI Chatbot Development',
      amount: 2500,
      date: '2024-03-15',
      status: 'completed'
    },
    {
      id: '2',
      project: 'ML Model Integration',
      amount: 1800,
      date: '2024-03-10',
      status: 'completed'
    },
    {
      id: '3',
      project: 'NLP System Implementation',
      amount: 3200,
      date: '2024-03-05',
      status: 'completed'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Recent Earnings
          </h2>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-green-500">+12.5% vs last month</span>
          </div>
        </div>

        <div className="space-y-4">
          {earnings.map((earning) => (
            <div
              key={earning.id}
              className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {earning.project}
                  </h3>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(earning.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${earning.amount}
                </span>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}