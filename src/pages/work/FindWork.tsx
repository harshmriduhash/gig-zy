import React from "react";
import { Layout } from "../../components/layout/Layout";
import { WorkHeader } from "../../components/work/WorkHeader";
import { WorkFilters } from "../../components/work/filters/WorkFilters";
import { ProjectList } from "../../components/work/projects/ProjectList";
import { useProjects } from "../../hooks/useProjects";

export function FindWorkPage() {
  const { projects, isLoading, error } = useProjects();

  return (
    <Layout>
      <WorkHeader
        title="Find Work"
        description="Browse through thousands of projects across various categories and find the perfect opportunity for your skills"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 flex-shrink-0">
            <WorkFilters />
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
