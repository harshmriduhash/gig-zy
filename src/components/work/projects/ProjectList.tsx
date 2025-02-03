import React from 'react';
import { ProjectCard } from './ProjectCard';
import { projects } from './data/projectsList';

export function ProjectList() {
  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}