import React from 'react';
import { Code } from 'lucide-react';
import { ServicePage } from '../../components/services/ServicePage';
import { webDevOfferings } from './data/webDevOfferings';

export function WebDevelopmentPage() {
  return (
    <ServicePage
      title="Website Development"
      description="Create, build, and develop your website with skilled website developers"
      icon={Code}
      offerings={webDevOfferings}
    />
  );
}