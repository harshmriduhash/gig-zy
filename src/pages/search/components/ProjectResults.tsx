import React from 'react';
import { ProjectCard } from './ProjectCard';
import { LoadingCard } from './LoadingCard';
import type { SearchResult } from '../types';

interface ProjectResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error: Error | null;
}

export function ProjectResults({ results, isLoading, error }: ProjectResultsProps) {
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
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No projects found matching your criteria
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}