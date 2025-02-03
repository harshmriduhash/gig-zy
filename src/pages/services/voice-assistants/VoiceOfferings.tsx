import React from 'react';
import { VoiceCard } from './VoiceCard';
import type { VoiceOffering } from './types';

interface VoiceOfferingsProps {
  offerings: VoiceOffering[];
}

export function VoiceOfferings({ offerings }: VoiceOfferingsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offerings.map((offering) => (
          <VoiceCard key={offering.id} offering={offering} />
        ))}
      </div>
    </div>
  );
}