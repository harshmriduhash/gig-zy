import React from 'react';
import { AutomationCard } from './AutomationCard';
import type { AutomationOffering } from './types';

interface AutomationOfferingsProps {
  offerings: AutomationOffering[];
}

export function AutomationOfferings({ offerings }: AutomationOfferingsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offerings.map((offering) => (
          <AutomationCard key={offering.id} offering={offering} />
        ))}
      </div>
    </div>
  );
}