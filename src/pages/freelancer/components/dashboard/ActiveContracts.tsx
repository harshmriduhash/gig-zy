import React from 'react';
import { Clock, DollarSign, CheckCircle } from 'lucide-react';
import type { Contract } from '../../../../types';

interface ActiveContractsProps {
  contracts: Contract[];
  isLoading: boolean;
  error: Error | null;
}

export function ActiveContracts({ contracts, isLoading, error }: ActiveContractsProps) {
  const activeContracts = contracts.filter(contract => contract.status === 'active');

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">Error loading contracts: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Active Contracts
        </h2>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : activeContracts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No active contracts at the moment
          </p>
        ) : (
          <div className="space-y-4">
            {activeContracts.map((contract) => (
              <div 
                key={contract.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {contract.project.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Client: {contract.client.full_name}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    Active
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ${contract.total_amount}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {contract.end_date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {contract.milestones_completed}/{contract.total_milestones}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}