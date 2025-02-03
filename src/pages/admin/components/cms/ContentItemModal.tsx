import React, { useState } from 'react';
import { X, History } from 'lucide-react';
import { ContentForm } from './ContentForm';
import { RevisionHistory } from './RevisionHistory';
import type { ContentType, ContentItem } from './types';

interface ContentItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: ContentType;
  contentItem?: ContentItem;
  onSubmit: (values: any) => Promise<void>;
}

export function ContentItemModal({ 
  isOpen, 
  onClose, 
  contentType,
  contentItem,
  onSubmit 
}: ContentItemModalProps) {
  const [showHistory, setShowHistory] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity" 
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {contentItem ? 'Edit Content' : `New ${contentType.name}`}
            </h2>
            <div className="flex items-center space-x-4">
              {contentItem && (
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                    showHistory
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <History className="h-4 w-4 mr-1" />
                  History
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex divide-x divide-gray-200 dark:divide-gray-700">
            <div className={`p-6 ${showHistory ? 'w-2/3' : 'w-full'}`}>
              <ContentForm
                contentType={contentType}
                initialValues={contentItem}
                onSubmit={async (values) => {
                  await onSubmit(values);
                  onClose();
                }}
              />
            </div>

            {showHistory && contentItem && (
              <div className="w-1/3 p-6 bg-gray-50 dark:bg-gray-800/50">
                <RevisionHistory
                  contentId={contentItem.id}
                  onRestore={() => {
                    setShowHistory(false);
                    onClose();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}