import React from 'react';
import { Calendar } from 'lucide-react';

interface ComparisonSelectorProps {
  comparisonType: 'previous_period' | 'year_over_year' | 'custom_baseline';
  onComparisonTypeChange: (type: 'previous_period' | 'year_over_year' | 'custom_baseline') => void;
  customBaseline?: {
    start: Date;
    end: Date;
  };
  onCustomBaselineChange?: (dates: { start: Date; end: Date }) => void;
}

export function ComparisonSelector({
  comparisonType,
  onComparisonTypeChange,
  customBaseline,
  onCustomBaselineChange
}: ComparisonSelectorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center mb-4">
        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          Comparison Period
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="previous_period"
              checked={comparisonType === 'previous_period'}
              onChange={(e) => onComparisonTypeChange(e.target.value as 'previous_period')}
              className="rounded-full border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Previous Period
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              value="year_over_year"
              checked={comparisonType === 'year_over_year'}
              onChange={(e) => onComparisonTypeChange(e.target.value as 'year_over_year')}
              className="rounded-full border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Year Over Year
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              value="custom_baseline"
              checked={comparisonType === 'custom_baseline'}
              onChange={(e) => onComparisonTypeChange(e.target.value as 'custom_baseline')}
              className="rounded-full border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Custom Baseline
            </span>
          </label>
        </div>

        {comparisonType === 'custom_baseline' && onCustomBaselineChange && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={customBaseline?.start.toISOString().split('T')[0]}
                onChange={(e) => onCustomBaselineChange({
                  start: new Date(e.target.value),
                  end: customBaseline?.end || new Date()
                })}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={customBaseline?.end.toISOString().split('T')[0]}
                onChange={(e) => onCustomBaselineChange({
                  start: customBaseline?.start || new Date(),
                  end: new Date(e.target.value)
                })}
                className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}