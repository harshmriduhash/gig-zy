import React from 'react';
import { MoreVertical } from 'lucide-react';
import { DisputeActions } from './DisputeActions';
import { DisputeStatusBadge } from './DisputeStatusBadge';
import type { Dispute } from './types';

interface DisputeRowProps {
  dispute: Dispute;
  onUpdateStatus: (disputeId: string, status: string) => Promise<void>;
}

export function DisputeRow({ dispute, onUpdateStatus }: DisputeRowProps) {
  const [showActions, setShowActions] = React.useState(false);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          #{dispute.id.slice(0, 8)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-white">{dispute.project.title}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Created {new Date(dispute.created_at).toLocaleDateString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col space-y-1">
          <div className="text-sm text-gray-900 dark:text-white">
            {dispute.client.full_name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            vs
          </div>
          <div className="text-sm text-gray-900 dark:text-white">
            {dispute.freelancer.full_name}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900 dark:text-white">
          ${dispute.amount.toFixed(2)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <DisputeStatusBadge status={dispute.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
          {showActions && (
            <DisputeActions
              dispute={dispute}
              onClose={() => setShowActions(false)}
              onUpdateStatus={onUpdateStatus}
            />
          )}
        </div>
      </td>
    </tr>
  );
}