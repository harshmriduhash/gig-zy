import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

function FilterDropdown({ options, value, onChange, label }: FilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <span className="text-gray-900 dark:text-white">{label}</span>
        <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 ${
                value === option.value
                  ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const serviceOptions = [
  { label: 'All Services', value: 'all' },
  { label: 'Process Automation', value: 'process' },
  { label: 'Document Processing', value: 'document' },
  { label: 'Customer Service', value: 'customer_service' },
  { label: 'Workflow Automation', value: 'workflow' }
];

const sellerOptions = [
  { label: 'All Sellers', value: 'all' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Level 2', value: 'level_2' },
  { label: 'Level 1', value: 'level_1' }
];

const budgetOptions = [
  { label: 'Any Budget', value: 'all' },
  { label: 'Under $1500', value: 'under_1500' },
  { label: '$1500 - $2000', value: '1500_2000' },
  { label: 'Over $2000', value: 'over_2000' }
];

const deliveryOptions = [
  { label: 'Any Time', value: 'all' },
  { label: 'Up to 21 days', value: '21_days' },
  { label: 'Up to 30 days', value: '30_days' },
  { label: 'Up to 45 days', value: '45_days' }
];

export function AutomationFilters() {
  const [filters, setFilters] = React.useState({
    service: 'all',
    seller: 'all',
    budget: 'all',
    delivery: 'all'
  });

  const handleFilterChange = (key: keyof typeof filters) => (value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FilterDropdown
            label="Service options"
            options={serviceOptions}
            value={filters.service}
            onChange={handleFilterChange('service')}
          />
          <FilterDropdown
            label="Seller details"
            options={sellerOptions}
            value={filters.seller}
            onChange={handleFilterChange('seller')}
          />
          <FilterDropdown
            label="Budget"
            options={budgetOptions}
            value={filters.budget}
            onChange={handleFilterChange('budget')}
          />
          <FilterDropdown
            label="Delivery time"
            options={deliveryOptions}
            value={filters.delivery}
            onChange={handleFilterChange('delivery')}
          />
        </div>
      </div>
    </div>
  );
}