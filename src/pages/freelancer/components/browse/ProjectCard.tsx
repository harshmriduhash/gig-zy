import React from 'react';
import { Clock, DollarSign, Users } from 'lucide-react';
import type { Project } from '../../../../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Posted by {project.client_name}
            </p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            {project.status}
          </span>
        </div>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          {project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.required_skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <DollarSign className="h-5 w-5 mr-1" />
              <span>
                ${project.budget_min} - ${project.budget_max}
              </span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Clock className="h-5 w-5 mr-1" />
              <span>{project.deadline}</span>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Users className="h-5 w-5 mr-1" />
              <span>{project.proposals_count} proposals</span>
            </div>
          </div>

          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
            Submit Proposal
          </button>
        </div>
      </div>
    </div>
  );
}