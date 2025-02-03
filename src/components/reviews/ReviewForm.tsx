import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Star } from 'lucide-react';
import { useReviews } from '../../hooks/useReviews';

interface ReviewFormProps {
  revieweeId: string;
  projectId: string;
  onSuccess: () => void;
}

export function ReviewForm({ revieweeId, projectId, onSuccess }: ReviewFormProps) {
  const { submitReview, isLoading, error } = useReviews();

  const formik = useFormik({
    initialValues: {
      rating: 0,
      review_text: ''
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .min(1, 'Please select a rating')
        .max(5, 'Maximum rating is 5')
        .required('Required'),
      review_text: Yup.string()
        .min(20, 'Must be at least 20 characters')
        .required('Required')
    }),
    onSubmit: async (values) => {
      try {
        await submitReview({
          reviewee_id: revieweeId,
          project_id: projectId,
          ...values
        });
        onSuccess();
      } catch (error) {
        console.error('Failed to submit review:', error);
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => formik.setFieldValue('rating', value)}
              className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                formik.values.rating >= value
                  ? 'text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            >
              <Star className="h-8 w-8 fill-current" />
            </button>
          ))}
        </div>
        {formik.touched.rating && formik.errors.rating && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">
            {formik.errors.rating}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="review_text" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Review
        </label>
        <textarea
          id="review_text"
          rows={4}
          {...formik.getFieldProps('review_text')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Share your experience working with this person..."
        />
        {formik.touched.review_text && formik.errors.review_text && (
          <div className="mt-1 text-red-600 dark:text-red-400 text-sm">
            {formik.errors.review_text}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}