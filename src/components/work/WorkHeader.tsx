import React from 'react';

interface WorkHeaderProps {
  title: string;
  description: string;
}

export function WorkHeader({ title, description }: WorkHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
        <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}