import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Save, X } from 'lucide-react';
import type { ContentType, ContentItem } from '../../types/cms';

interface ContentEditorProps {
  contentType: ContentType;
  initialContent?: ContentItem;
  onSave: (values: any) => Promise<void>;
  onCancel: () => void;
}

export function ContentEditor({ contentType, initialContent, onSave, onCancel }: ContentEditorProps) {
  const generateValidationSchema = (fields: ContentType['fields']) => {
    return Yup.object().shape(
      fields.reduce((acc, field) => {
        let validator: any = Yup.string();

        switch (field.type) {
          case 'number':
            validator = Yup.number();
            break;
          case 'array':
            validator = Yup.array().of(Yup.string());
            break;
          case 'boolean':
            validator = Yup.boolean();
            break;
          case 'object':
            if (field.fields) {
              validator = generateValidationSchema(field.fields);
            }
            break;
        }

        if (field.required) {
          validator = validator.required('Required');
        }

        return { ...acc, [field.name]: validator };
      }, {})
    );
  };

  const formik = useFormik({
    initialValues: initialContent?.content || contentType.fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.type === 'array' ? [] : ''
    }), {}),
    validationSchema: generateValidationSchema(contentType.fields),
    onSubmit: async (values) => {
      try {
        await onSave(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
  });

  const renderField = (field: ContentType['fields'][0]) => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.name}
            {...formik.getFieldProps(field.name)}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        );

      case 'array':
        const values = formik.values[field.name] || [];
        return (
          <div className="space-y-2">
            {values.map((value: string, index: number) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    const newValues = [...values];
                    newValues[index] = e.target.value;
                    formik.setFieldValue(field.name, newValues);
                  }}
                  className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newValues = values.filter((_: any, i: number) => i !== index);
                    formik.setFieldValue(field.name, newValues);
                  }}
                  className="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                formik.setFieldValue(field.name, [...values, '']);
              }}
              className="px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              Add Item
            </button>
          </div>
        );

      case 'boolean':
        return (
          <input
            type="checkbox"
            id={field.name}
            {...formik.getFieldProps(field.name)}
            className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
          />
        );

      default:
        return (
          <input
            type={field.type === 'number' ? 'number' : 'text'}
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
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-50"
        >
          <Save className="h-4 w-4 inline-block mr-2" />
          {formik.isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}