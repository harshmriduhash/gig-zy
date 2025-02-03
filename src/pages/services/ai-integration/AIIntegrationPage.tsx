import React from 'react';
import { Plug } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { AIIntegrationFilters } from './AIIntegrationFilters';
import { AIIntegrationOfferings } from './AIIntegrationOfferings';
import { aiIntegrationOfferings } from './data/aiIntegrationOfferings';

export function AIIntegrationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="AI API Integration"
        description="Connect with integration experts to seamlessly incorporate AI capabilities into your applications"
        icon={Plug}
      />
      <AIIntegrationFilters />
      <AIIntegrationOfferings offerings={aiIntegrationOfferings} />
    </div>
  );
}