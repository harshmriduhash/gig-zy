import React from 'react';
import { AnalyticsDashboard } from './dashboard/AnalyticsDashboard';
import { AnalyticsFilters } from './filters/AnalyticsFilters';
import { useAnalytics } from './hooks/useAnalytics';

export function Analytics() {
  const [filters, setFilters] = React.useState({
    timeframe: 'month',
    comparison: 'previous_period'
  });

  const { data, isLoading, error } = useAnalytics(filters);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Analytics & Reporting
          </h2>
          <AnalyticsFilters filters={filters} onChange={setFilters} />
        </div>
        <AnalyticsDashboard 
          data={data}
          isLoading={isLoading}
          error={error}
          timeframe={filters.timeframe}
        />
      </div>
    </div>
  );
}