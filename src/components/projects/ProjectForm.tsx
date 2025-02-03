import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useProject } from '../../hooks/useProject';

interface ProjectFormProps {
  onSuccess: (projectId: string) => void;
}

export function ProjectForm({ onSuccess }: ProjectFormProps) {
  const { createProject, isLoading, error } = useProject();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      budget_min: 0,
      budget_max: 0,
      required_skills: [] as string[],
      deadline: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      budget_min: Yup.number().min(0).required('Required'),
      budget_max: Yup.number().min(Yup.ref('budget_min')).required('Required'),
      required_skills: Yup.array().min(1, 'Add at least one skill'),
      deadline: Yup.date().min(new Date(), 'Deadline must be in the future').required('Required')
    }),
    onSubmit: async (values) => {
      try {
        const project = await createProject(values);
        onSuccess(project.id);
      } catch (error) {
        console.error('Failed to create project:', error);
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
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Project Title
        </label>
        <input
          id="title"
          type="text"
          {...formik.getFieldProps('title')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {formik.touched.title && formik.errors.title && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">{formik.errors.title}</div>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Project Description
        </label>
        <textarea
          id="description"
          rows={4}
          {...formik.getFieldProps('description')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {formik.touched.description && formik.errors.description && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">{formik.errors.description}</div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="budget_min" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Minimum Budget
          </label>
          <input
            id="budget_min"
            type="number"
            {...formik.getFieldProps('budget_min')}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {formik.touched.budget_min && formik.errors.budget_min && (
            <div className="mt-1 text-red-600 dark:text-red-400 text-sm">{formik.errors.budget_min}</div>
          )}
        </div>

        <div>
          <label htmlFor="budget_max" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Maximum Budget
          </label>
          <input
            id="budget_max"
            type="number"
            {...formik.getFieldProps('budget_max')}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          {formik.touched.budget_max && formik.errors.budget_max && (
            <div className="mt-1 text-red-600 dark:text-red-400 text-sm">{formik.errors.budget_max}</div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Project Deadline
        </label>
        <input
          id="deadline"
          type="date"
          {...formik.getFieldProps('deadline')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {formik.touched.deadline && formik.errors.deadline && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">{formik.errors.deadline}</div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => formik.submitForm()}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Project'}
        </button>
      </div>
    </form>
  );
}