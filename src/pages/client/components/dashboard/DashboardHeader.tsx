import React from 'react';
import { PlusCircle, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardHeader() {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <BarChart2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Project Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your projects, track progress, and handle payments
              </p>
            </div>
          </div>

          <Link
            to="/post-project"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Post New Project
          </Link>
        </div>
      </div>
    </div>
  );
}