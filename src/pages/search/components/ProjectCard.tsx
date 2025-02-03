import React from 'react';
import { Clock, DollarSign, Users } from 'lucide-react';
import type { SearchResult } from '../types';

interface ProjectCardProps {
  project: SearchResult;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
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
            Open
          </span>
        </div>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <DollarSign className="h-5 w-5 mr-2" />
            <span>${project.budget_min} - ${project.budget_max}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Clock className="h-5 w-5 mr-2" />
            <span>{project.duration}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Users className="h-5 w-5 mr-2" />
            <span>{project.proposals_count} proposals</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            Save
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
            Submit Proposal
          </button>
        </div>
      </div>
    </div>
  );
}