import React from 'react';
import { MoreVertical, Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { ProjectActions } from './ProjectActions';
import type { Project } from '../../../../types';

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
  error: Error | null;
  onUpdateStatus: (projectId: string, status: string) => Promise<void>;
}

export function ProjectList({ projects, isLoading, error, onUpdateStatus }: ProjectListProps) {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'disputed':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <XCircle className="h-5 w-5 text-gray-500" />;
    }
  };

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
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex-1">
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-3 w-32 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Project
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Client
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Budget
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {project.title}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Created {new Date(project.created_at).toLocaleDateString()}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={project.client.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(project.client.full_name)}`}
                      alt={project.client.full_name}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {project.client.full_name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {getStatusIcon(project.status)}
                  <span className="ml-2 text-sm text-gray-900 dark:text-white capitalize">
                    {project.status}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                ${project.budget_min} - ${project.budget_max}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === project.id ? null : project.id)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  {activeMenu === project.id && (
                    <ProjectActions
                      project={project}
                      onClose={() => setActiveMenu(null)}
                      onUpdateStatus={onUpdateStatus}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}