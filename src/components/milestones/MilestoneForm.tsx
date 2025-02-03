import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMilestones } from '../../hooks/useMilestones';

interface MilestoneFormProps {
  projectId: string;
  onSuccess: () => void;
}

export function MilestoneForm({ projectId, onSuccess }: MilestoneFormProps) {
  const { createMilestone, isLoading, error } = useMilestones();

  const formik = useFormik({
    initialValues: {
      description: '',
      amount: 0,
      due_date: ''
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Required'),
      amount: Yup.number().min(1, 'Must be at least 1').required('Required'),
      due_date: Yup.date()
        .min(new Date(), 'Due date must be in the future')
        .required('Required')
    }),
    onSubmit: async (values) => {
      try {
        await createMilestone({
          project_id: projectId,
          ...values
        });
        onSuccess();
      } catch (error) {
        console.error('Failed to create milestone:', error);
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
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Milestone Description
        </label>
        <textarea
          id="description"
          rows={3}
          {...formik.getFieldProps('description')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {formik.touched.description && formik.errors.description && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">{formik.errors.description}</div>
        )}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Amount
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
        <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Due Date
        </label>
        <input
          id="due_date"
          type="date"
          {...formik.getFieldProps('due_date')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {formik.touched.due_date && formik.errors.due_date && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">{formik.errors.due_date}</div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Milestone'}
        </button>
      </div>
    </form>
  );
}