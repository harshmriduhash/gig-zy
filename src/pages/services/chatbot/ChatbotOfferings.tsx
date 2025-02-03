import React from 'react';
import { ChatbotCard } from './ChatbotCard';
import type { ChatbotOffering } from './types';

interface ChatbotOfferingsProps {
  offerings: ChatbotOffering[];
}

export function ChatbotOfferings({ offerings }: ChatbotOfferingsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {offerings.map((offering) => (
          <ChatbotCard key={offering.id} offering={offering} />
        ))}
      </div>
    </div>
  );
}