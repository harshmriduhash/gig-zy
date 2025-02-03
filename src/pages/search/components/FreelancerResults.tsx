import React from 'react';
import { FreelancerCard } from './FreelancerCard';
import { LoadingCard } from './LoadingCard';
import type { SearchResult } from '../types';

interface FreelancerResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error: Error | null;
}

export function FreelancerResults({ results, isLoading, error }: FreelancerResultsProps) {
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">
          Error loading results: {error.message}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No freelancers found matching your criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {results.map((freelancer) => (
        <FreelancerCard key={freelancer.id} freelancer={freelancer} />
      ))}
    </div>
  );
}