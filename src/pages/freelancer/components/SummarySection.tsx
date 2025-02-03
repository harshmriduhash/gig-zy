import React from 'react';

export function SummarySection() {
  const [summary, setSummary] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Professional Summary</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
        </div>

        {isEditing ? (
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={4}
            className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Write a professional summary that highlights your expertise and experience..."
          />
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            {summary || (
              <p className="text-gray-500 dark:text-gray-400 italic">
                Add a professional summary to help clients understand your expertise and experience.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}