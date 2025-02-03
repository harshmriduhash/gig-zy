import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { X } from 'lucide-react';

interface SkillsFormProps {
  onSubmit: (values: { skills: string[] }) => void;
  initialSkills?: string[];
}

export function SkillsForm({ onSubmit, initialSkills = [] }: SkillsFormProps) {
  const formik = useFormik({
    initialValues: {
      skills: initialSkills,
      skillInput: ''
    },
    validationSchema: Yup.object({
      skills: Yup.array().min(1, 'Add at least one skill').required('Required'),
      skillInput: Yup.string()
    }),
    onSubmit: (values) => {
      onSubmit({ skills: values.skills });
    }
  });

  const handleAddSkill = () => {
    const skill = formik.values.skillInput.trim();
    if (skill && !formik.values.skills.includes(skill)) {
      formik.setFieldValue('skills', [...formik.values.skills, skill]);
      formik.setFieldValue('skillInput', '');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    formik.setFieldValue(
      'skills',
      formik.values.skills.filter(skill => skill !== skillToRemove)
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="skillInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Add Your Skills
        </label>
        <div className="mt-1">
          <div className="flex gap-2">
            <input
              id="skillInput"
              type="text"
              value={formik.values.skillInput}
              onChange={formik.handleChange}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              className="block w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., React, Node.js, Python"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {formik.values.skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="ml-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        ))}
      </div>

      {formik.touched.skills && formik.errors.skills && (
        <div className="text-red-600 dark:text-red-400 text-sm">
          {formik.errors.skills}
        </div>
      )}

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