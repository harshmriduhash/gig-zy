import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ExperienceFormProps {
  onSubmit: (values: {
    yearsOfExperience: number;
    hourlyRate: number;
    availability: string;
  }) => void;
}

export function ExperienceForm({ onSubmit }: ExperienceFormProps) {
  const formik = useFormik({
    initialValues: {
      yearsOfExperience: 0,
      hourlyRate: 0,
      availability: 'full-time'
    },
    validationSchema: Yup.object({
      yearsOfExperience: Yup.number()
        .min(0, 'Must be 0 or greater')
        .required('Required'),
      hourlyRate: Yup.number()
        .min(1, 'Must be at least $1')
        .required('Required'),
      availability: Yup.string()
        .oneOf(['full-time', 'part-time', 'contract'])
        .required('Required')
    }),
    onSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Years of Experience
        </label>
        <input
          id="yearsOfExperience"
          type="number"
          {...formik.getFieldProps('yearsOfExperience')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
        />
        {formik.touched.yearsOfExperience && formik.errors.yearsOfExperience && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">
            {formik.errors.yearsOfExperience}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Hourly Rate (USD)
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
          </div>
          <input
            id="hourlyRate"
            type="number"
            {...formik.getFieldProps('hourlyRate')}
            className="block w-full pl-7 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        {formik.touched.hourlyRate && formik.errors.hourlyRate && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">
            {formik.errors.hourlyRate}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Availability
        </label>
        <select
          id="availability"
          {...formik.getFieldProps('availability')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="full-time">Full Time (40hrs/week)</option>
          <option value="part-time">Part Time (20hrs/week)</option>
          <option value="contract">Contract/Project Based</option>
        </select>
        {formik.touched.availability && formik.errors.availability && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">
            {formik.errors.availability}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Continue
        </button>
      </div>
    </form>
  );
}