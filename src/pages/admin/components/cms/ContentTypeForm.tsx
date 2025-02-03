import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Plus, X, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { ContentType, ContentField } from './types';

interface ContentTypeFormProps {
  initialValues?: ContentType;
  onSubmit: (values: any) => Promise<void>;
}

const fieldTypes = [
  { value: 'text', label: 'Text' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'number', label: 'Number' },
  { value: 'array', label: 'Array' }
];

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  slug: Yup.string()
    .required('Required')
    .matches(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens are allowed')
    .min(3, 'Must be at least 3 characters'),
  description: Yup.string(),
  fields: Yup.array().of(
    Yup.object({
      name: Yup.string()
        .required('Required')
        .matches(/^[a-zA-Z][a-zA-Z0-9]*$/, 'Must start with a letter and contain only letters and numbers'),
      type: Yup.string().required('Required').oneOf(['text', 'textarea', 'number', 'array']),
      required: Yup.boolean(),
      label: Yup.string().required('Required')
    })
  ).min(1, 'At least one field is required')
});

export function ContentTypeForm({ initialValues, onSubmit }: ContentTypeFormProps) {
  const formik = useFormik({
    initialValues: initialValues || {
      name: '',
      slug: '',
      description: '',
      fields: []
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
  });

  const addField = () => {
    formik.setFieldValue('fields', [
      ...formik.values.fields,
      {
        name: '',
        type: 'text',
        required: false,
        label: ''
      }
    ]);
  };

  const removeField = (index: number) => {
    const newFields = [...formik.values.fields];
    newFields.splice(index, 1);
    formik.setFieldValue('fields', newFields);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const fields = Array.from(formik.values.fields);
    const [reorderedField] = fields.splice(result.source.index, 1);
    fields.splice(result.destination.index, 0, reorderedField);

    formik.setFieldValue('fields', fields);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...formik.getFieldProps('name')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="mt-1 text-sm text-red-600 dark:text-red-400">{formik.errors.name}</div>
        )}
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          {...formik.getFieldProps('slug')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {formik.touched.slug && formik.errors.slug && (
          <div className="mt-1 text-sm text-red-600 dark:text-red-400">{formik.errors.slug}</div>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          {...formik.getFieldProps('description')}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Fields
          </label>
          <button
            type="button"
            onClick={addField}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Field
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <div 
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-4"
              >
                {formik.values.fields.map((field: ContentField, index: number) => (
                  <Draggable 
                    key={index} 
                    draggableId={`field-${index}`} 
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          transition: snapshot.isDragging ? 'none' : 'all 0.2s ease'
                        }}
                        className={`flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transform transition-all duration-200 ${
                          snapshot.isDragging 
                            ? 'shadow-lg ring-2 ring-indigo-500 scale-[1.02] rotate-1 z-50' 
                            : 'hover:shadow-md hover:scale-[1.01]'
                        }`}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className={`mt-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 cursor-move transition-colors duration-200 ${
                            snapshot.isDragging ? 'text-indigo-500 dark:text-indigo-400' : ''
                          }`}
                        >
                          <GripVertical className={`h-5 w-5 transform transition-transform duration-200 ${
                            snapshot.isDragging ? 'scale-110' : ''
                          }`} />
                        </div>

                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Field Name
                            </label>
                            <input
                              type="text"
                              value={field.name}
                              onChange={(e) => {
                                formik.setFieldValue(`fields.${index}.name`, e.target.value);
                              }}
                              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            {formik.touched.fields?.[index]?.name && formik.errors.fields?.[index]?.name && (
                              <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                                {formik.errors.fields[index].name}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Field Label
                            </label>
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => {
                                formik.setFieldValue(`fields.${index}.label`, e.target.value);
                              }}
                              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            {formik.touched.fields?.[index]?.label && formik.errors.fields?.[index]?.label && (
                              <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                                {formik.errors.fields[index].label}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Field Type
                            </label>
                            <select
                              value={field.type}
                              onChange={(e) => {
                                formik.setFieldValue(`fields.${index}.type`, e.target.value);
                              }}
                              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                              {fieldTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex items-center justify-between">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={field.required}
                                onChange={(e) => {
                                  formik.setFieldValue(`fields.${index}.required`, e.target.checked);
                                }}
                                className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Required</span>
                            </label>

                            <button
                              type="button"
                              onClick={() => removeField(index)}
                              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {formik.touched.fields && formik.errors.fields && typeof formik.errors.fields === 'string' && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400">{formik.errors.fields}</div>
        )}
      </div>

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