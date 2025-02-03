import React from 'react';
import { Sliders } from 'lucide-react';
import type { SearchType, SearchFilters as Filters } from '../types';

interface SearchFiltersProps {
  type: SearchType;
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function SearchFilters({ type, filters, onChange }: SearchFiltersProps) {
  const handleFilterChange = (key: keyof Filters, value: any) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
          <Sliders className="h-5 w-5 text-gray-500" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {type === 'freelancers' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skills
              </label>
              <input
                type="text"
                placeholder="e.g., React, Python"
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
                onChange={(e) => handleFilterChange('skills', e.target.value.split(',').map(s => s.trim()))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Rating
              </label>
              <select
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
                onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
              >
                <option value="">Any rating</option>
                <option value="4.5">4.5+ stars</option>
                <option value="4">4+ stars</option>
                <option value="3">3+ stars</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hourly Rate
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
                  onChange={(e) => handleFilterChange('hourlyRate', { ...filters.hourlyRate, min: Number(e.target.value) })}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
                  onChange={(e) => handleFilterChange('hourlyRate', { ...filters.hourlyRate, max: Number(e.target.value) })}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Budget Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
                  onChange={(e) => handleFilterChange('budget', { ...filters.budget, min: Number(e.target.value) })}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
                  onChange={(e) => handleFilterChange('budget', { ...filters.budget, max: Number(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Length
              </label>
              <select
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
                onChange={(e) => handleFilterChange('projectLength', e.target.value)}
              >
                <option value="">Any duration</option>
                <option value="less_than_week">Less than a week</option>
                <option value="less_than_month">Less than a month</option>
                <option value="one_to_three_months">1-3 months</option>
                <option value="more_than_three_months">More than 3 months</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Required Skills
              </label>
              <input
                type="text"
                placeholder="e.g., React, Python"
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
                onChange={(e) => handleFilterChange('skills', e.target.value.split(',').map(s => s.trim()))}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}