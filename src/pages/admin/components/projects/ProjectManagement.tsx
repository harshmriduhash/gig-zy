import React from 'react';
import { ProjectList } from './ProjectList';
import { ProjectFilters } from './ProjectFilters';
import { useAdminProjects } from '../../../../hooks/useAdminProjects';

export function ProjectManagement() {
  const [filters, setFilters] = React.useState({
    status: 'all',
    category: 'all',
    timeframe: 'all'
  });

  const { projects, isLoading, error, updateProjectStatus } = useAdminProjects(filters);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Project Management
          </h2>
          <ProjectFilters filters={filters} onChange={setFilters} />
        </div>
        <ProjectList 
          projects={projects}
          isLoading={isLoading}
          error={error}
          onUpdateStatus={updateProjectStatus}
        />
      </div>
    </div>
  );
}