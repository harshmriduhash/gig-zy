import React from 'react';
import { Search, Users, Briefcase } from 'lucide-react';
import type { SearchType } from '../types';

interface SearchHeaderProps {
  searchType: SearchType;
  onSearchTypeChange: (type: SearchType) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export function SearchHeader({
  searchType,
  onSearchTypeChange,
  searchQuery,
  onSearchQueryChange
}: SearchHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <button
              onClick={() => onSearchTypeChange('freelancers')}
              className={`flex items-center px-4 py-2 rounded-md ${
                searchType === 'freelancers'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Users className="h-5 w-5 mr-2" />
              Freelancers
            </button>
            <button
              onClick={() => onSearchTypeChange('projects')}
              className={`flex items-center px-4 py-2 rounded-md ${
                searchType === 'projects'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Briefcase className="h-5 w-5 mr-2" />
              Projects
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder={`Search ${searchType}...`}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}