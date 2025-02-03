import React from 'react';
import { Clock, DollarSign, MessageSquare } from 'lucide-react';
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
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {bid.project.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Bid submitted {bid.created_at}
            </p>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bid.status)}`}>
            {bid.status}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <DollarSign className="h-5 w-5 mr-2" />
            <span>Bid Amount: ${bid.amount}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <Clock className="h-5 w-5 mr-2" />
            <span>Timeline: {bid.proposed_timeline}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <MessageSquare className="h-5 w-5 mr-2" />
            <span>{bid.messages_count} messages</span>
          </div>
        </div>

        {bid.cover_note && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {bid.cover_note}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            View Project
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600">
            Message Client
          </button>
        </div>
      </div>
    </div>
  );
}