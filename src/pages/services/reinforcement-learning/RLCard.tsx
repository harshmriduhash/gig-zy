import React from 'react';
import { Star, Clock, Award, MessageSquare } from 'lucide-react';
import type { RLOffering } from './types';

interface RLCardProps {
  offering: RLOffering;
}

export function RLCard({ offering }: RLCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={offering.thumbnailUrl}
          alt={offering.title}
          className="w-full h-48 object-cover"
        />
        {offering.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-indigo-600 text-white text-sm rounded-full">
            Featured
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={offering.expert.avatar}
            alt={offering.expert.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {offering.expert.name}
            </h3>
            <div className="flex items-center">
              <Award className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mr-1" />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {offering.expert.level}
              </span>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {offering.title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {offering.description}
        </p>

        <div className="flex items-center mb-4">
          <Star className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="font-medium text-gray-900 dark:text-white">
            {offering.rating}
          </span>
          <span className="text-gray-600 dark:text-gray-300 ml-1">
            ({offering.reviewCount})
          </span>
          <div className="ml-auto flex items-center text-gray-600 dark:text-gray-300">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{offering.deliveryTime}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {offering.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-white rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${offering.price}
            </span>
            <span className="text-gray-600 dark:text-gray-300 text-sm ml-1">
              /project
            </span>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}