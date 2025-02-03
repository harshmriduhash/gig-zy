import React from 'react';
import { DisputeRow } from './DisputeRow';
import { DisputeLoadingSkeleton } from './DisputeLoadingSkeleton';
import type { Dispute } from './types';

interface DisputeListProps {
  disputes: Dispute[];
  isLoading: boolean;
  error: Error | null;
  onUpdateStatus: (disputeId: string, status: string) => Promise<void>;
}

export function DisputeList({ disputes, isLoading, error, onUpdateStatus }: DisputeListProps) {
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">
          Error loading disputes: {error.message}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <DisputeLoadingSkeleton />;
  }

  if (disputes.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No disputes found
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Case ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Project
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Parties
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {disputes.map((dispute) => (
            <DisputeRow
              key={dispute.id}
              dispute={dispute}
              onUpdateStatus={onUpdateStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}