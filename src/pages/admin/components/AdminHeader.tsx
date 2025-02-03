import React from 'react';
import { Shield } from 'lucide-react';

export function AdminHeader() {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage users, monitor activity, and maintain platform integrity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}