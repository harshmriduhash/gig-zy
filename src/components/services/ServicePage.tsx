import React, { useState } from 'react';
import { ServiceHeader } from './ServiceHeader';
import { ServiceFilters } from './filters/ServiceFilters';
import { ServiceCard } from './offerings/ServiceCard';
import type { ServicePageProps, ServiceOffering } from './types';

export function ServicePage({ title, description, icon, offerings: initialOfferings }: ServicePageProps) {
  const [offerings, setOfferings] = useState<ServiceOffering[]>(initialOfferings);

  const filters = [
    {
      id: 'serviceOptions',
      label: 'Service Options',
      options: [
        { value: 'all', label: 'All Services' },
        { value: 'basic', label: 'Basic' },
        { value: 'standard', label: 'Standard' },
        { value: 'premium', label: 'Premium' }
      ]
    },
    {
      id: 'sellerLevel',
      label: 'Seller Level',
      options: [
        { value: 'all', label: 'All Levels' },
        { value: 'level1', label: 'Level 1' },
        { value: 'level2', label: 'Level 2' },
        { value: 'topRated', label: 'Top Rated' }
      ]
    },
    {
      id: 'budget',
      label: 'Budget',
      options: [
        { value: 'all', label: 'Any Budget' },
        { value: '0-50', label: 'Under $50' },
        { value: '50-100', label: '$50 to $100' },
        { value: '100+', label: '$100 & above' }
      ]
    },
    {
      id: 'deliveryTime',
      label: 'Delivery Time',
      options: [
        { value: 'all', label: 'Any Time' },
        { value: '24h', label: 'Up to 24 hours' },
        { value: '3d', label: 'Up to 3 days' },
        { value: '7d', label: 'Up to 7 days' }
      ]
    }
  ];

  const handleFilterChange = (filterId: string, value: string) => {
    // Implement filtering logic here
    console.log(`Filter ${filterId} changed to ${value}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ServiceHeader title={title} description={description} icon={icon} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ServiceFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>
          
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offerings.map((offering) => (
                <ServiceCard key={offering.id} offering={offering} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}