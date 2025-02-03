import React from 'react';
import { Link } from 'react-router-dom';
import type { NicheService } from './types';

interface NicheServiceCardProps {
  service: NicheService;
}

export function NicheServiceCard({ service }: NicheServiceCardProps) {
  const { title, description, icon: Icon, services, path } = service;
  
  const CardContent = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <Icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-3">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      <ul className="space-y-4">
        {services.map((item) => (
          <li key={item.name}>
            <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  if (path) {
    return (
      <Link to={path}>
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}