import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { ProjectsHeader } from './components/browse/ProjectsHeader';
import { ProjectFilters } from './components/browse/ProjectFilters';
import { ProjectList } from './components/browse/ProjectList';
import { useProjects } from '../../hooks/useProjects';

export function BrowseProjectsPage() {
  const { projects, isLoading, error } = useProjects();

  return (
    <Layout>
      <ProjectsHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 flex-shrink-0">
            <ProjectFilters />
          </div>
          <div className="flex-1">
            <ProjectList 
              projects={projects}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}