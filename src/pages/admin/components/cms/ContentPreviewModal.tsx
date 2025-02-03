import React from 'react';
import { X } from 'lucide-react';
import type { ContentItem } from './types';

interface ContentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentItem: ContentItem;
}

export function ContentPreviewModal({ isOpen, onClose, contentItem }: ContentPreviewModalProps) {
  if (!isOpen) return null;

  const renderField = (key: string, value: any) => {
    if (Array.isArray(value)) {
      return (
        <div className="space-y-1">
          {value.map((item, index) => (
            <div key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-sm">
              {item}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === 'string' && value.startsWith('http')) {
      return (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {value}
        </a>
      );
    }

    return <div>{value}</div>;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity" 
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Preview: {contentItem.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {contentItem.type.fields.map((field) => (
              <div key={field.name}>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {field.label}
                </h3>
                {renderField(field.name, contentItem.content[field.name])}
              </div>
            ))}
          </div>

          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div>
                Status: {contentItem.status.charAt(0).toUpperCase() + contentItem.status.slice(1)}
              </div>
              <div>
                Last updated: {new Date(contentItem.updated_at).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}