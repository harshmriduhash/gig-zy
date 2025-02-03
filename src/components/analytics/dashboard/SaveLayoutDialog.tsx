import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { DashboardLayout } from '../../../hooks/useDashboardConfig';

interface SaveLayoutDialogProps {
  onSave: (layout: Omit<DashboardLayout, 'id'>) => Promise<void>;
  onClose: () => void;
  currentLayout?: DashboardLayout;
}

export function SaveLayoutDialog({ onSave, onClose, currentLayout }: SaveLayoutDialogProps) {
  const [name, setName] = useState(currentLayout?.name || '');
  const [description, setDescription] = useState(currentLayout?.description || '');
  const [isDefault, setIsDefault] = useState(currentLayout?.isDefault || false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await onSave({
        name,
        description,
        isDefault,
        widgets: currentLayout?.widgets || []
      });
      onClose();
    } catch (error) {
      console.error('Failed to save layout:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Save Dashboard Layout
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Layout Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDefault"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="isDefault"
                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Set as default layout
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name || isSaving}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Layout'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}