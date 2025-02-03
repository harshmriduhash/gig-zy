import React from 'react';
import { Brain } from 'lucide-react';
import { ServiceHeader } from '../../../components/services/ServiceHeader';
import { MLServiceFilters } from './MLServiceFilters';
import { MLServiceOfferings } from './MLServiceOfferings';
import { mlOfferings } from './data/mlOfferings';

export function MLModelsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader
        title="Machine Learning (ML) Models"
        description="Connect with expert ML engineers to build custom machine learning solutions tailored to your business needs"
        icon={Brain}
      />
      <MLServiceFilters />
      <MLServiceOfferings offerings={mlOfferings} />
    </div>
  );
}