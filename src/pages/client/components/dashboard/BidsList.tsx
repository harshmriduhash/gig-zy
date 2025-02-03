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
  const pendingBids = bids.filter(b => b.status === 'pending');

  return (
    <section>
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Pending Proposals
      </h2>

      {error ? (
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
          <p className="text-red-700 dark:text-red-300">
            Error loading bids: {error.message}
          </p>
        </div>
      ) : isLoading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <LoadingBidCard key={i} />
          ))}
        </div>
      ) : pendingBids.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No pending proposals to review
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingBids.map((bid) => (
            <BidCard key={bid.id} bid={bid} />
          ))}
        </div>
      )}
    </section>
  );
}