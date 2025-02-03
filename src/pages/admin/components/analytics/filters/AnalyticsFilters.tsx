import React from 'react';
import { Filter } from 'lucide-react';

interface AnalyticsFiltersProps {
  filters: {
    timeframe: string;
    comparison: string;
  };
  onChange: (filters: any) => void;
}

export function AnalyticsFilters({ filters, onChange }: AnalyticsFiltersProps) {
  return (
    <div className="flex items-center space-x-4">
      <select
        value={filters.timeframe}
        onChange={(e) => onChange({ ...filters, timeframe: e.target.value })}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
      >
        <option value="week">Last 7 Days</option>
        <option value="month">Last 30 Days</option>
        <option value="quarter">Last Quarter</option>
        <option value="year">Last Year</option>
      </select>

      <select
        value={filters.comparison}
        onChange={(e) => onChange({ ...filters, comparison: e.target.value })}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
      >
        <option value="previous_period">vs Previous Period</option>
        <option value="previous_year">vs Previous Year</option>
      </select>

      <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <Filter className="h-4 w-4 mr-2" />
        More Filters
      </button>
    </div>
  );
}