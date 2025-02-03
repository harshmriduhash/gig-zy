import React from 'react';
import { History, RotateCcw } from 'lucide-react';
import { useContentRevisions } from './hooks/useContentRevisions';
import type { ContentRevision } from './types';

interface RevisionHistoryProps {
  contentId: string;
  onRestore: () => void;
}

export function RevisionHistory({ contentId, onRestore }: RevisionHistoryProps) {
  const { revisions, isLoading, error, restoreRevision } = useContentRevisions(contentId);
  const [selectedRevision, setSelectedRevision] = React.useState<ContentRevision | null>(null);

  const handleRestore = async (revisionId: string) => {
    try {
      await restoreRevision(revisionId);
      onRestore();
    } catch (error) {
      console.error('Failed to restore revision:', error);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">Error loading revisions: {error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (revisions.length === 0) {
    return (
      <div className="text-center py-12">
        <History className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <p className="text-gray-500 dark:text-gray-400">No revision history available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {revisions.map((revision) => (
        <div
          key={revision.id}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${
            selectedRevision?.id === revision.id ? 'ring-2 ring-indigo-500' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {revision.created_by.full_name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(revision.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedRevision(revision)}
                className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                View Changes
              </button>
              <button
                onClick={() => handleRestore(revision.id)}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Restore
              </button>
            </div>
          </div>

          {selectedRevision?.id === revision.id && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md">
              <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {JSON.stringify(revision.content, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}