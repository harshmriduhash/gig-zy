import React from 'react';
import { Star, Video } from 'lucide-react';
import type { ServiceOffering } from '../types';

interface ServiceCardProps {
  offering: ServiceOffering;
}

export function ServiceCard({ offering }: ServiceCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={offering.thumbnailUrl}
          alt={offering.title}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={offering.sellerAvatar}
            alt={offering.sellerName}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{offering.sellerName}</h3>
            <span className="text-sm text-gray-600 dark:text-gray-400">{offering.sellerLevel}</span>
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
          <span className="font-medium text-gray-900 dark:text-white">{offering.rating}</span>
          <span className="text-gray-600 dark:text-gray-400 ml-1">({offering.reviewCount})</span>
          {offering.hasVideoConsultation && (
            <div className="ml-auto flex items-center text-indigo-600 dark:text-indigo-400">
              <Video className="h-4 w-4 mr-1" />
              <span className="text-sm">Video consultation</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            From US${offering.price}
          </span>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}