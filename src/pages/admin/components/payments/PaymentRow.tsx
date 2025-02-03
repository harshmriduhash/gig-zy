import React from 'react';
import { MoreVertical } from 'lucide-react';
import { PaymentActions } from './PaymentActions';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import type { Payment } from './types';

interface PaymentRowProps {
  payment: Payment;
  onUpdateStatus: (paymentId: string, status: string) => Promise<void>;
}

export function PaymentRow({ payment, onUpdateStatus }: PaymentRowProps) {
  const [showActions, setShowActions] = React.useState(false);

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          #{payment.id.slice(0, 8)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-white">{payment.project.title}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {payment.milestone?.description || 'Direct Payment'}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          ${payment.amount.toFixed(2)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <PaymentStatusBadge status={payment.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(payment.created_at).toLocaleDateString()}
        </span>
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
            <PaymentActions
              payment={payment}
              onClose={() => setShowActions(false)}
              onUpdateStatus={onUpdateStatus}
            />
          )}
        </div>
      </td>
    </tr>
  );
}