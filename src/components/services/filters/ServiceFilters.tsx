import React from 'react';
import { Filter } from 'lucide-react';
import type { ServiceFilter } from '../types';

interface ServiceFiltersProps {
  filters: ServiceFilter[];
  onFilterChange: (filterId: string, value: string) => void;
}

export function ServiceFilters({ filters, onFilterChange }: ServiceFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
      </div>
      <div className="space-y-4">
        {filters.map((filter) => (
          <div key={filter.id}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {filter.label}
            </label>
            <select
              onChange={(e) => onFilterChange(filter.id, e.target.value)}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}