import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceHeaderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ServiceHeader({ title, description, icon: Icon }: ServiceHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-6">
          <Icon className="h-12 w-12 text-indigo-300" />
        </div>
        <h1 className="text-4xl font-bold text-white text-center mb-4">{title}</h1>
        <p className="text-xl text-indigo-100 text-center max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}