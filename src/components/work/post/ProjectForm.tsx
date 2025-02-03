import React from 'react';
import { ProjectBasicInfo } from './ProjectBasicInfo';
import { ProjectDetails } from './ProjectDetails';
import { ProjectBudget } from './ProjectBudget';
import { ProjectAttachments } from './ProjectAttachments';

export function ProjectForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ProjectBasicInfo />
      <ProjectDetails />
      <ProjectBudget />
      <ProjectAttachments />
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors"
        >
          Post Project
        </button>
      </div>
    </form>
  );
}