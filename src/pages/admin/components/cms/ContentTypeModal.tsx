import React from 'react';
import { X } from 'lucide-react';
import { ContentTypeForm } from './ContentTypeForm';
import type { ContentType } from './types';

interface ContentTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType?: ContentType;
  onSubmit: (values: any) => Promise<void>;
}

export function ContentTypeModal({ isOpen, onClose, contentType, onSubmit }: ContentTypeModalProps) {
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
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              {contentType ? 'Edit Content Type' : 'New Content Type'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <ContentTypeForm
              initialValues={contentType}
              onSubmit={async (values) => {
                await onSubmit(values);
                onClose();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}