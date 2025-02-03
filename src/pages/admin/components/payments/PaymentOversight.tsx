import React from 'react';
import { PaymentList } from './PaymentList';
import { PaymentFilters } from './PaymentFilters';
import { PaymentStats } from './PaymentStats';
import { usePayments } from './hooks/usePayments';

export function PaymentOversight() {
  const [filters, setFilters] = React.useState({
    status: 'all',
    timeframe: 'all',
    amount: 'all'
  });

  const { payments, stats, isLoading, error, updatePaymentStatus } = usePayments(filters);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6">
        <div className="mb-8">
          <PaymentStats stats={stats} isLoading={isLoading} />
        </div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Payment Management
          </h2>
          <PaymentFilters filters={filters} onChange={setFilters} />
        </div>
        <PaymentList 
          payments={payments}
          isLoading={isLoading}
          error={error}
          onUpdateStatus={updatePaymentStatus}
        />
      </div>
    </div>
  );
}