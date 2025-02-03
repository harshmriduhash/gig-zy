import React, { useState } from 'react';
import { Upload, X, Image, FileText, Film, Music } from 'lucide-react';
import { useMediaLibrary } from '../../hooks/useMediaLibrary';

interface MediaLibraryProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

export function MediaLibrary({ onSelect, onClose }: MediaLibraryProps) {
  const { uploadMedia, deleteMedia, isUploading, error } = useMediaLibrary();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      try {
        const media = await uploadMedia(file);
        onSelect(media.url);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const media = await uploadMedia(file);
        onSelect(media.url);
      } catch (error) {
        console.error('Upload failed:', error);
      }
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Film;
    if (type.startsWith('audio/')) return Music;
    return FileText;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Media Library
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                {error.message}
              </div>
            )}

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors"
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Drag and drop files here, or
              </p>
              <label className="inline-block">
                <span className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md cursor-pointer">
                  Browse Files
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileInput}
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                />
              </label>
            </div>

            {isUploading && (
              <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600 dark:border-indigo-400 mr-3" />
                  <span className="text-indigo-600 dark:text-indigo-400">
                    Uploading...
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}