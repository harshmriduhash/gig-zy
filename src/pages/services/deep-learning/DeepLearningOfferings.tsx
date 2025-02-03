import React from 'react';
import { DeepLearningCard } from './DeepLearningCard';
import type { DeepLearningOffering } from './types';

interface DeepLearningOfferingsProps {
  offerings: DeepLearningOffering[];
}

export function DeepLearningOfferings({ offerings }: DeepLearningOfferingsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offerings.map((offering) => (
          <DeepLearningCard key={offering.id} offering={offering} />
        ))}
      </div>
    </div>
  );
}