import React from 'react';
import { Clock, DollarSign } from 'lucide-react';
import type { Bid } from '../../../../types';

interface ActiveBidsProps {
  bids: Bid[];
  isLoading: boolean;
  error: Error | null;
}

export function ActiveBids({ bids, isLoading, error }: ActiveBidsProps) {
  const activeBids = bids.filter(bid => bid.status === 'pending');

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">Error loading bids: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Active Bids
        </h2>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : activeBids.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No active bids at the moment
          </p>
        ) : (
          <div className="space-y-4">
            {activeBids.map((bid) => (
              <div 
                key={bid.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {bid.project.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Submitted {new Date(bid.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                    Pending
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Bid Amount: ${bid.amount}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    Delivery: {bid.proposed_timeline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}