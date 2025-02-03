import React from 'react';
import { ProjectCard } from './ProjectCard';
import { LoadingProjectCard } from './LoadingProjectCard';
import type { Project } from '../../../../types';

interface ProjectsListProps {
  projects: Project[];
  isLoading: boolean;
  error?: Error | null;
}

export function ProjectsList({ projects, isLoading, error }: ProjectsListProps) {
  const activeProjects = projects.filter(p => 
    ['open', 'in_progress'].includes(p.status)
  );

  return (
    <section>
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Active Projects
      </h2>

      {error ? (
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
          <p className="text-red-700 dark:text-red-300">
            Error loading projects: {error.message}
          </p>
        </div>
      ) : isLoading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <LoadingProjectCard key={i} />
          ))}
        </div>
      ) : activeProjects.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No active projects at the moment
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activeProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}