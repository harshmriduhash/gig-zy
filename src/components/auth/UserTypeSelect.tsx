import React from 'react';
import { UserCircle, Briefcase } from 'lucide-react';

interface UserTypeSelectProps {
  onSelect: (type: 'freelancer' | 'client') => void;
}

export function UserTypeSelect({ onSelect }: UserTypeSelectProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <button
        onClick={() => onSelect('freelancer')}
        className="relative rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-4 shadow-sm hover:border-indigo-500 focus:outline-none"
      >
        <div className="flex items-center space-x-3">
          <UserCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <div className="flex-1 text-left">
            <p className="text-base font-medium text-gray-900 dark:text-white">Freelancer</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Find work and offer services</p>
          </div>
        </div>
      </button>

      <button
        onClick={() => onSelect('client')}
        className="relative rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-4 shadow-sm hover:border-indigo-500 focus:outline-none"
      >
        <div className="flex items-center space-x-3">
          <Briefcase className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <div className="flex-1 text-left">
            <p className="text-base font-medium text-gray-900 dark:text-white">Client</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Post projects and hire talent</p>
          </div>
        </div>
      </button>
    </div>
  );
}