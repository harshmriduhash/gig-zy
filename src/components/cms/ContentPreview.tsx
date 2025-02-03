import React from 'react';
import { X } from 'lucide-react';
import type { ContentItem } from '../../types/cms';

interface ContentPreviewProps {
  content: ContentItem;
  onClose: () => void;
}

export function ContentPreview({ content, onClose }: ContentPreviewProps) {
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

    if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-4">
          {Object.entries(value).map(([k, v]) => (
            <div key={k}>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {k}
              </h4>
              {renderField(k, v)}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === 'string' && value.match(/^https?:\/\//)) {
      if (value.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return (
          <img
            src={value}
            alt={key}
            className="max-w-full h-auto rounded-lg"
          />
        );
      }
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
      );
    }

    return <div>{String(value)}</div>;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Preview: {content.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {content.type.fields.map((field) => (
              <div key={field.name}>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {field.label}
                </h3>
                {renderField(field.name, content.content[field.name])}
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div>Status: {content.status}</div>
              <div>Last updated: {new Date(content.updated_at).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}