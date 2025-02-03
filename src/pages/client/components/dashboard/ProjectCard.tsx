import React from 'react';
import { Clock, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../../../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'in_progress':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Posted {new Date(project.created_at).toLocaleDateString()}
          </p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status.replace('_', ' ')}
        </span>
      </div>

      <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-2">
        {project.description}
      </p>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <DollarSign className="h-5 w-5 mr-2" />
          <span>${project.budget_min} - ${project.budget_max}</span>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Clock className="h-5 w-5 mr-2" />
          <span>{new Date(project.deadline).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Users className="h-5 w-5 mr-2" />
          <span>{project.bids?.length || 0} proposals</span>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          View Details
        </Link>
        <Link
          to={`/projects/${project.id}/milestones`}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Manage Milestones
        </Link>
      </div>
    </div>
  );
}