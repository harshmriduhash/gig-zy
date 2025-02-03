import React from 'react';
import { Clock, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import type { Bid } from '../../../../types';

interface BidCardProps {
  bid: Bid;
}

export function BidCard({ bid }: BidCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      case 'accepted':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {bid.freelancer.full_name}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Submitted {new Date(bid.created_at).toLocaleDateString()}
          </p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bid.status)}`}>
          {bid.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <DollarSign className="h-5 w-5 mr-2" />
          <span>Bid Amount: ${bid.amount}</span>
        </div>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <Clock className="h-5 w-5 mr-2" />
          <span>Delivery: {bid.proposed_timeline}</span>
        </div>
      </div>

      {bid.cover_note && (
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300">{bid.cover_note}</p>
        </div>
      )}

      {bid.status === 'pending' && (
        <div className="flex justify-end space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
            <CheckCircle className="h-4 w-4 mr-2" />
            Accept
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600">
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </button>
        </div>
      )}

      <div className="flex justify-end">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          View Profile
        </button>
      </div>
    </div>
  );
}