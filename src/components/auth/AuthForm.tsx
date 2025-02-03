import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { validateEmail, validatePassword } from '../../lib/supabase/auth/validation';
import { Loader2 } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'signup';
  userType?: 'freelancer' | 'client';
  onSubmit: (data: any) => Promise<void>;
  error?: string | null;
  isLoading?: boolean;
}

export function AuthForm({ type, userType, onSubmit, error, isLoading = false }: AuthFormProps) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fullName: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Required')
        .test('email', 'Invalid email address', validateEmail),
      password: Yup.string()
        .required('Required')
        .test('password', (value, { createError }) => {
          const validation = validatePassword(value || '');
          return validation.isValid || createError({ message: validation.message });
        }),
      ...(type === 'signup' && {
        fullName: Yup.string().required('Required'),
      }),
    }),
    onSubmit: async (values) => {
      try {
        await onSubmit(values);
      } catch (err) {
        console.error('Form submission error:', err);
      }
    },
  });

  return (
    <div className="w-full max-w-md">
      {error && (
        <div className="mb-4 p-3 rounded-md bg-red-50 dark:bg-red-900/30">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {type === 'signup' && (
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              {...formik.getFieldProps('fullName')}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formik.errors.fullName}</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps('password')}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || formik.isSubmitting}
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {(isLoading || formik.isSubmitting) ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
              {type === 'signup' ? 'Creating Account...' : 'Signing In...'}
            </>
          ) : (
            type === 'signup' ? 'Create Account' : 'Sign In'
          )}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {type === 'signup' ? (
              <>
                Already have an account?{' '}
                <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                  Sign in
                </Link>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
                  Sign up
                </Link>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}