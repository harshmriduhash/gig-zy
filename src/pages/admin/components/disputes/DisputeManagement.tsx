import React from 'react';
import { DisputeList } from './DisputeList';
import { DisputeFilters } from './DisputeFilters';
import { useDisputes } from './hooks/useDisputes';

export function DisputeManagement() {
  const [filters, setFilters] = React.useState({
    status: 'all',
    timeframe: 'all',
    priority: 'all'
  });

  const { disputes, isLoading, error, updateDisputeStatus } = useDisputes(filters);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Dispute Management
          </h2>
          <DisputeFilters filters={filters} onChange={setFilters} />
        </div>
        <DisputeList 
          disputes={disputes}
          isLoading={isLoading}
          error={error}
          onUpdateStatus={updateDisputeStatus}
        />
      </div>
    </div>
  );
}