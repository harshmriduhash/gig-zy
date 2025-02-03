import React from 'react';
import { FeatureCard } from './FeatureCard';
import { features } from './data/featuresList';

export function WhyChooseGigzy() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Gigzy
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Experience the difference with our comprehensive freelancing platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}