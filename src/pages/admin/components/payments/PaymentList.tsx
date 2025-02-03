import React from 'react';
import { PaymentRow } from './PaymentRow';
import { PaymentLoadingSkeleton } from './PaymentLoadingSkeleton';
import type { Payment } from './types';

interface PaymentListProps {
  payments: Payment[];
  isLoading: boolean;
  error: Error | null;
  onUpdateStatus: (paymentId: string, status: string) => Promise<void>;
}

export function PaymentList({ payments, isLoading, error, onUpdateStatus }: PaymentListProps) {
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">
          Error loading payments: {error.message}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <PaymentLoadingSkeleton />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Transaction ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Project
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Date
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {payments.map((payment) => (
            <PaymentRow
              key={payment.id}
              payment={payment}
              onUpdateStatus={onUpdateStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}