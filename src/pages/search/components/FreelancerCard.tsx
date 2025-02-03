import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';
import type { SearchResult } from '../types';

interface FreelancerCardProps {
  freelancer: SearchResult;
}

export function FreelancerCard({ freelancer }: FreelancerCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center">
          <img
            src={freelancer.avatar_url || 'https://via.placeholder.com/40'}
            alt={freelancer.full_name}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {freelancer.full_name}
            </h3>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                {freelancer.rating?.toFixed(1) || 'New'}
              </span>
              {freelancer.location && (
                <>
                  <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                    {freelancer.location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
            {freelancer.bio}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {freelancer.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200"
            >
              {skill}
            </span>
          ))}
          {freelancer.skills.length > 4 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              +{freelancer.skills.length - 4} more
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{freelancer.availability}</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ${freelancer.hourly_rate}
            </span>
            <span className="text-gray-500 dark:text-gray-400">/hr</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}