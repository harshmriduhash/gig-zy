import React from 'react';
import { Filter } from 'lucide-react';
import type { SearchType, SearchFilters as Filters } from '../../types';

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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <Filter className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
      </div>

      <div className="space-y-6">
        {/* Skills Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Skills
          </label>
          <div className="space-y-2">
            {['React', 'Node.js', 'Python', 'Machine Learning', 'UI/UX Design'].map((skill) => (
              <label key={skill} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.skills?.includes(skill)}
                  onChange={(e) => {
                    const skills = filters.skills || [];
                    if (e.target.checked) {
                      handleFilterChange('skills', [...skills, skill]);
                    } else {
                      handleFilterChange('skills', skills.filter(s => s !== skill));
                    }
                  }}
                  className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {type === 'freelancers' ? (
          <>
            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Rating
              </label>
              <select
                value={filters.rating || ''}
                onChange={(e) => handleFilterChange('rating', Number(e.target.value) || undefined)}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ stars</option>
                <option value="4">4+ stars</option>
                <option value="3">3+ stars</option>
              </select>
            </div>

            {/* Hourly Rate Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hourly Rate
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.hourlyRate?.min || ''}
                    onChange={(e) => handleFilterChange('hourlyRate', {
                      ...filters.hourlyRate,
                      min: Number(e.target.value) || undefined
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.hourlyRate?.max || ''}
                    onChange={(e) => handleFilterChange('hourlyRate', {
                      ...filters.hourlyRate,
                      max: Number(e.target.value) || undefined
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Budget Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Budget Range
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.budget?.min || ''}
                    onChange={(e) => handleFilterChange('budget', {
                      ...filters.budget,
                      min: Number(e.target.value) || undefined
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.budget?.max || ''}
                    onChange={(e) => handleFilterChange('budget', {
                      ...filters.budget,
                      max: Number(e.target.value) || undefined
                    })}
                    className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Project Length Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Length
              </label>
              <select
                value={filters.projectLength || ''}
                onChange={(e) => handleFilterChange('projectLength', e.target.value || undefined)}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Any Duration</option>
                <option value="less_than_week">Less than a week</option>
                <option value="less_than_month">Less than a month</option>
                <option value="one_to_three_months">1-3 months</option>
                <option value="more_than_three_months">More than 3 months</option>
              </select>
            </div>
          </>
        )}

        {/* Location Filter (for freelancers) */}
        {type === 'freelancers' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={filters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value || undefined)}
              placeholder="Enter location"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-3 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}