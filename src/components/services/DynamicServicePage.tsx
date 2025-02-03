import React from 'react';
import { useParams } from 'react-router-dom';
import { ServiceHeader } from './ServiceHeader';
import { ServiceFilters } from './filters/ServiceFilters';
import { ServiceCard } from './offerings/ServiceCard';
import { useServiceContent } from '../../hooks/useServiceContent';
import * as Icons from 'lucide-react';

export function DynamicServicePage() {
  const { slug } = useParams();
  const { content, isLoading, error } = useServiceContent(slug || '');

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-red-600 dark:text-red-400">Error loading service: {error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-400">Service not found</p>
        </div>
      </div>
    );
  }

  // Get the icon component dynamically
  const IconComponent = (Icons as any)[content.content.icon] || Icons.Code;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title={content.content.title}
        description={content.content.description}
        icon={IconComponent}
      />
      <ServiceFilters filters={content.content.filters} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.content.offerings.map((offering: any) => (
            <ServiceCard key={offering.title} offering={offering} />
          ))}
        </div>
      </div>
    </div>
  );
}