import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ContentField, ContentItem } from './types';

interface ContentFormProps {
  contentType: {
    id: string;
    name: string;
    fields: ContentField[];
  };
  initialValues?: ContentItem;
  onSubmit: (values: any) => Promise<void>;
}

export function ContentForm({ contentType, initialValues, onSubmit }: ContentFormProps) {
  const validationSchema = Yup.object().shape(
    contentType.fields.reduce((acc, field) => {
      let validator = Yup.string();
      
      if (field.type === 'number') {
        validator = Yup.number();
      } else if (field.type === 'array') {
        validator = Yup.array().of(Yup.string());
      }
      
      if (field.required) {
        validator = validator.required('Required');
      }
      
      return { ...acc, [field.name]: validator };
    }, {})
  );

  const formik = useFormik({
    initialValues: initialValues?.content || 
      contentType.fields.reduce((acc, field) => ({
        ...acc,
        [field.name]: field.type === 'array' ? [] : ''
      }), {}),
    validationSchema,
    onSubmit: async (values) => {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
  });

  const renderField = (field: ContentField) => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.name}
            rows={4}
            {...formik.getFieldProps(field.name)}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        );
      
      case 'array':
        return (
          <div className="space-y-2">
            {formik.values[field.name].map((item: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newValues = [...formik.values[field.name]];
                    newValues[index] = e.target.value;
                    formik.setFieldValue(field.name, newValues);
                  }}
                  className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newValues = formik.values[field.name].filter((_: any, i: number) => i !== index);
                    formik.setFieldValue(field.name, newValues);
                  }}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                formik.setFieldValue(field.name, [...formik.values[field.name], '']);
              }}
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Add Item
            </button>
          </div>
        );
      
      default:
        return (
          <input
            type={field.type}
            id={field.name}
            {...formik.getFieldProps(field.name)}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        );
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {contentType.fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
          {formik.touched[field.name] && formik.errors[field.name] && (
            <div className="mt-1 text-sm text-red-600 dark:text-red-400">
              {formik.errors[field.name] as string}
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => formik.resetForm()}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50"
        >
          {formik.isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}