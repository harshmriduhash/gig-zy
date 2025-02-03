import React from 'react';
import { ComputerVisionCard } from './ComputerVisionCard';
import type { CVOffering } from './types';

interface ComputerVisionOfferingsProps {
  offerings: CVOffering[];
}

export function ComputerVisionOfferings({ offerings }: ComputerVisionOfferingsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offerings.map((offering) => (
          <ComputerVisionCard key={offering.id} offering={offering} />
        ))}
      </div>
    </div>
  );
}