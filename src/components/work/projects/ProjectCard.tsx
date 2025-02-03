import React from 'react';
import { Clock, DollarSign, MapPin } from 'lucide-react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{project.postedBy}</span>
          </div>
        </div>
        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
          {project.category}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {project.description}
      </p>
      
      <div className="flex items-center mb-4">
        <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
        <span className="font-medium text-gray-900 dark:text-white">${project.budget}</span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4 mr-1" />
          <span>Posted {project.postedDate}</span>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  );
}