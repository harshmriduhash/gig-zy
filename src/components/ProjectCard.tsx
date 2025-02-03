import React from 'react';
import { DollarSign, Clock } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{project.description}</p>
      
      <div className="flex items-center mb-4">
        <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
        <span className="font-medium text-gray-900 dark:text-white">${project.budget}</span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>Posted {project.postedDate}</span>
        </div>
        <button className="px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
          Apply Now
        </button>
      </div>
    </div>
  );
}