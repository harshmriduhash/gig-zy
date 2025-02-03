import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface CompanyFormProps {
  onSubmit: (values: {
    companyName: string;
    industry: string;
    size: string;
    description: string;
  }) => void;
}

export function CompanyForm({ onSubmit }: CompanyFormProps) {
  const formik = useFormik({
    initialValues: {
      companyName: '',
      industry: '',
      size: '',
      description: ''
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required('Required'),
      industry: Yup.string().required('Required'),
      size: Yup.string().required('Required'),
      description: Yup.string().required('Required')
    }),
    onSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company Name
        </label>
        <input
          id="companyName"
          type="text"
          {...formik.getFieldProps('companyName')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
        />
        {formik.touched.companyName && formik.errors.companyName && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">
            {formik.errors.companyName}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Industry
        </label>
        <select
          id="industry"
          {...formik.getFieldProps('industry')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select an industry</option>
          <option value="technology">Technology</option>
          <option value="finance">Finance</option>
          <option value="healthcare">Healthcare</option>
          <option value="education">Education</option>
          <option value="retail">Retail</option>
          <option value="other">Other</option>
        </select>
        {formik.touched.industry && formik.errors.industry && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">
            {formik.errors.industry}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company Size
        </label>
        <select
          id="size"
          {...formik.getFieldProps('size')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select company size</option>
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="201-500">201-500 employees</option>
          <option value="501+">501+ employees</option>
        </select>
        {formik.touched.size && formik.errors.size && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">
            {formik.errors.size}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company Description
        </label>
        <textarea
          id="description"
          rows={4}
          {...formik.getFieldProps('description')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
        />
        {formik.touched.description && formik.errors.description && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">
            {formik.errors.description}
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