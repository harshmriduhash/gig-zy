import React from 'react';
import { Filter } from 'lucide-react';

interface UserFiltersProps {
  filters: {
    role: string;
    status: string;
    verified: string;
  };
  onChange: (filters: any) => void;
}

export function UserFilters({ filters, onChange }: UserFiltersProps) {
  return (
    <div className="flex items-center space-x-4">
      <select
        value={filters.role}
        onChange={(e) => onChange({ ...filters, role: e.target.value })}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
      >
        <option value="all">All Roles</option>
        <option value="freelancer">Freelancers</option>
        <option value="client">Clients</option>
        <option value="admin">Admins</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
      >
        <option value="all">All Statuses</option>
        <option value="active">Active</option>
        <option value="suspended">Suspended</option>
        <option value="banned">Banned</option>
      </select>

      <select
        value={filters.verified}
        onChange={(e) => onChange({ ...filters, verified: e.target.value })}
        className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
      >
        <option value="all">All Users</option>
        <option value="verified">Verified Only</option>
        <option value="unverified">Unverified Only</option>
      </select>

      <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <Filter className="h-4 w-4 mr-2" />
        More Filters
      </button>
    </div>
  );
}