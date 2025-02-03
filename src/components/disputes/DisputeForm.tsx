import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDisputes } from '../../hooks/useDisputes';

interface DisputeFormProps {
  transactionId: string;
  onSuccess: () => void;
}

export function DisputeForm({ transactionId, onSuccess }: DisputeFormProps) {
  const { createDispute, isLoading, error } = useDisputes();

  const formik = useFormik({
    initialValues: {
      reason: '',
      evidence: ''
    },
    validationSchema: Yup.object({
      reason: Yup.string()
        .min(50, 'Must be at least 50 characters')
        .required('Required'),
      evidence: Yup.string()
    }),
    onSubmit: async (values) => {
      try {
        await createDispute({
          transaction_id: transactionId,
          ...values
        });
        onSuccess();
      } catch (error) {
        console.error('Failed to create dispute:', error);
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
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Reason for Dispute
        </label>
        <textarea
          id="reason"
          rows={4}
          {...formik.getFieldProps('reason')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Please explain the reason for this dispute in detail..."
        />
        {formik.touched.reason && formik.errors.reason && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">
            {formik.errors.reason}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="evidence" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Supporting Evidence (Optional)
        </label>
        <textarea
          id="evidence"
          rows={4}
          {...formik.getFieldProps('evidence')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Provide any additional evidence or documentation..."
        />
        {formik.touched.evidence && formik.errors.evidence && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">
            {formik.errors.evidence}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Submit Dispute'}
        </button>
      </div>
    </form>
  );
}