import React from 'react';
import { Plus, Edit, Archive, Eye } from 'lucide-react';
import { useContent } from './hooks/useContent';
import { ContentTypeModal } from './ContentTypeModal';
import { ContentTypeList } from './ContentTypeList';
import { ContentItemModal } from './ContentItemModal';
import { ContentPreviewModal } from './ContentPreviewModal';
import { useContentTypes } from './hooks/useContentTypes';
import type { ContentStatus, ContentItem, ContentType } from './types';

export function ContentList() {
  const { contentItems, isLoading, error, createContent, updateContent, updateContentStatus } = useContent();
  const { contentTypes, createContentType } = useContentTypes();
  const [selectedStatus, setSelectedStatus] = React.useState<ContentStatus>('published');
  const [isTypeModalOpen, setIsTypeModalOpen] = React.useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = React.useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<ContentType | null>(null);
  const [selectedItem, setSelectedItem] = React.useState<ContentItem | null>(null);

  const filteredItems = contentItems.filter(item => item.status === selectedStatus);

  const handleCreateItem = (type: ContentType) => {
    setSelectedType(type);
    setSelectedItem(null);
    setIsItemModalOpen(true);
  };

  const handleEditItem = (item: ContentItem) => {
    setSelectedType(item.type);
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handlePreviewItem = (item: ContentItem) => {
    setSelectedItem(item);
    setIsPreviewModalOpen(true);
  };

  const handleArchiveItem = async (item: ContentItem) => {
    try {
      await updateContentStatus(item.id, 'archived');
    } catch (error) {
      console.error('Failed to archive item:', error);
    }
  };

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">Error loading content: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Content Types Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Content Types</h2>
            <button 
              onClick={() => setIsTypeModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Type
            </button>
          </div>

          <ContentTypeList onCreateItem={handleCreateItem} />
        </div>
      </div>

      {/* Content Items Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Content Items</h2>
            {contentTypes.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => {
                    if (contentTypes.length === 1) {
                      handleCreateItem(contentTypes[0]);
                    } else {
                      // Show content type selection dropdown
                    }
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Content
                </button>
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="flex space-x-4">
              {(['draft', 'published', 'archived'] as ContentStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    selectedStatus === status
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No {selectedStatus} content found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900 dark:text-white">
                          {item.type.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(item.updated_at).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-3">
                          <button
                            onClick={() => handlePreviewItem(item)}
                            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditItem(item)}
                            className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleArchiveItem(item)}
                            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                          >
                            <Archive className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ContentTypeModal
        isOpen={isTypeModalOpen}
        onClose={() => setIsTypeModalOpen(false)}
        onSubmit={createContentType}
      />

      {selectedType && (
        <ContentItemModal
          isOpen={isItemModalOpen}
          onClose={() => {
            setIsItemModalOpen(false);
            setSelectedType(null);
            setSelectedItem(null);
          }}
          contentType={selectedType}
          contentItem={selectedItem}
          onSubmit={async (values) => {
            if (selectedItem) {
              await updateContent(selectedItem.id, values);
            } else {
              await createContent(selectedType.id, values);
            }
          }}
        />
      )}

      {selectedItem && (
        <ContentPreviewModal
          isOpen={isPreviewModalOpen}
          onClose={() => {
            setIsPreviewModalOpen(false);
            setSelectedItem(null);
          }}
          contentItem={selectedItem}
        />
      )}
    </div>
  );
}