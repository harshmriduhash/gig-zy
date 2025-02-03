import React from 'react';
import { Sparkles } from 'lucide-react';
import { useRecommendations } from '../../hooks/useRecommendations';
import { FreelancerCard } from './FreelancerCard';
import { ProjectCard } from './ProjectCard';

export function Recommendations() {
  const { recommendations, isLoading, error } = useRecommendations();

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">
          Error loading recommendations: {error.message}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Recommended for You
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((item) => (
          item.type === 'freelancer' ? (
            <FreelancerCard key={item.id} freelancer={item} />
          ) : (
            <ProjectCard key={item.id} project={item} />
          )
        ))}
      </div>
    </div>
  );
}