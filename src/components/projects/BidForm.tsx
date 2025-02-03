import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useBidding } from '../../hooks/useBidding';

interface BidFormProps {
  projectId: string;
  onSuccess: () => void;
}

export function BidForm({ projectId, onSuccess }: BidFormProps) {
  const { submitBid, isLoading, error } = useBidding();

  const formik = useFormik({
    initialValues: {
      amount: 0,
      proposed_timeline: '',
      cover_note: ''
    },
    validationSchema: Yup.object({
      amount: Yup.number().min(1, 'Must be at least 1').required('Required'),
      proposed_timeline: Yup.date()
        .min(new Date(), 'Timeline must be in the future')
        .required('Required'),
      cover_note: Yup.string()
        .min(50, 'Must be at least 50 characters')
        .required('Required')
    }),
    onSubmit: async (values) => {
      try {
        await submitBid({
          project_id: projectId,
          ...values
        });
        onSuccess();
      } catch (error) {
        console.error('Failed to submit bid:', error);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
          <p className="text-red-700 dark:text-red-300">{error.message}</p>
        </div>
      )}

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Bid Amount
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
          </div>
          <input
            id="amount"
            type="number"
            {...formik.getFieldProps('amount')}
            className="block w-full pl-7 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        {formik.touched.amount && formik.errors.amount && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">{formik.errors.amount}</div>
        )}
      </div>

      <div>
        <label htmlFor="proposed_timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Proposed Completion Date
        </label>
        <input
          id="proposed_timeline"
          type="date"
          {...formik.getFieldProps('proposed_timeline')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {formik.touched.proposed_timeline && formik.errors.proposed_timeline && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">{formik.errors.proposed_timeline}</div>
        )}
      </div>

      <div>
        <label htmlFor="cover_note" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Cover Note
        </label>
        <textarea
          id="cover_note"
          rows={4}
          {...formik.getFieldProps('cover_note')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Explain why you're the best fit for this project..."
        />
        {formik.touched.cover_note && formik.errors.cover_note && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">{formik.errors.cover_note}</div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Submit Proposal'}
        </button>
      </div>
    </form>
  );
}