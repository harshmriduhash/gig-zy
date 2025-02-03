import React from 'react';
import { FreelancerResults } from './FreelancerResults';
import { ProjectResults } from './ProjectResults';
import { SearchFilters } from './SearchFilters';
import type { SearchType, SearchResult, SearchFilters as Filters } from '../types';

interface SearchResultsProps {
  type: SearchType;
  results: SearchResult[];
  isLoading: boolean;
  error: Error | null;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function SearchResults({
  type,
  results,
  isLoading,
  error,
  filters,
  onFiltersChange
}: SearchResultsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex-shrink-0">
          <SearchFilters
            type={type}
            filters={filters}
            onChange={onFiltersChange}
          />
        </div>
        <div className="flex-1">
          {type === 'freelancers' ? (
            <FreelancerResults
              results={results}
              isLoading={isLoading}
              error={error}
            />
          ) : (
            <ProjectResults
              results={results}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
}