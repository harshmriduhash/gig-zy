import React from 'react';
import { Network } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { DeepLearningFilters } from './DeepLearningFilters';
import { DeepLearningOfferings } from './DeepLearningOfferings';
import { deepLearningOfferings } from './data/deepLearningOfferings';

export function DeepLearningPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="Deep Learning Solutions"
        description="Connect with deep learning experts to build advanced neural networks and AI solutions for complex problems"
        icon={Network}
      />
      <DeepLearningFilters />
      <DeepLearningOfferings offerings={deepLearningOfferings} />
    </div>
  );
}