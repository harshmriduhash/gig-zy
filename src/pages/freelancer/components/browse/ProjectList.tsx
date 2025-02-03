import React from 'react';
import { ProjectCard } from './ProjectCard';
import { LoadingProjectCard } from './LoadingProjectCard';
import type { Project } from '../../../../types';

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
  error?: Error | null;
}

export function ProjectList({ projects, isLoading, error }: ProjectListProps) {
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">
          Error loading projects: {error.message}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <LoadingProjectCard key={i} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No projects found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}