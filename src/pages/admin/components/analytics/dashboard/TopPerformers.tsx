import React from 'react';
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react';
import type { TopPerformer } from '../types';

interface TopPerformersProps {
  data: TopPerformer[];
  isLoading: boolean;
}

export function TopPerformers({ data, isLoading }: TopPerformersProps) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Trophy className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Top Performers
          </h3>
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center">
              <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="mt-2 h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <Trophy className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Top Performers
        </h3>
      </div>
      
      <div className="space-y-4">
        {data.map((performer) => (
          <div key={performer.id} className="flex items-center">
            <img
              src={performer.avatar}
              alt={performer.name}
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {performer.name}
                </p>
                <div className={`flex items-center text-sm ${
                  performer.change >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {performer.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(performer.change)}%
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {performer.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}