import React from 'react';
import { Filter } from 'lucide-react';

interface ProjectFiltersProps {
  filters: {
    status: string;
    category: string;
    timeframe: string;
  };
  onChange: (filters: any) => void;
}

export function ProjectFilters({ filters, onChange }: ProjectFiltersProps) {
  return (
    <div className="flex items-center space-x-4">
      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
      >
        <option value="all">All Statuses</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="disputed">Disputed</option>
        <option value="closed">Closed</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
      >
        <option value="all">All Categories</option>
        <option value="web_development">Web Development</option>
        <option value="mobile_development">Mobile Development</option>
        <option value="ai_ml">AI & Machine Learning</option>
        <option value="design">Design</option>
      </select>

      <select
        value={filters.timeframe}
        onChange={(e) => onChange({ ...filters, timeframe: e.target.value })}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="quarter">This Quarter</option>
      </select>

      <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <Filter className="h-4 w-4 mr-2" />
        More Filters
      </button>
    </div>
  );
}