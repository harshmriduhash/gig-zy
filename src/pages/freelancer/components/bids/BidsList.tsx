import React from 'react';
import { BidCard } from './BidCard';
import { LoadingBidCard } from './LoadingBidCard';
import type { Bid } from '../../../../types';

interface BidsListProps {
  bids: Bid[];
  isLoading: boolean;
  error?: Error | null;
}

export function BidsList({ bids, isLoading, error }: BidsListProps) {
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">
          Error loading bids: {error.message}
        </p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Active Bids
      </h2>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <LoadingBidCard key={i} />
          ))}
        </div>
      ) : bids.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            You haven't submitted any bids yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bids.map((bid) => (
            <BidCard key={bid.id} bid={bid} />
          ))}
        </div>
      )}
    </section>
  );
}