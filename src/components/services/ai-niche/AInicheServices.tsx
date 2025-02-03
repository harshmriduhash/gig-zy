import React from 'react';
import { Cpu } from 'lucide-react';
import { NicheServiceCard } from './NicheServiceCard';
import { nicheServices } from './data/nicheServices';

export function AINicheServices() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Cpu className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            AI Niche Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Specialized AI solutions for industry-specific challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nicheServices.map((service) => (
            <NicheServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}