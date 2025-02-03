import React from 'react';
import { Upload, X, ExternalLink } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
}

export function PortfolioSection() {
  const [items, setItems] = React.useState<PortfolioItem[]>([]);
  const [isAdding, setIsAdding] = React.useState(false);

  const addItem = (item: Omit<PortfolioItem, 'id'>) => {
    setItems([...items, { ...item, id: crypto.randomUUID() }]);
    setIsAdding(false);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Portfolio</h3>
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.id} className="relative group">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2">
                <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                {item.projectUrl && (
                  <a
                    href={item.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-2 text-sm text-indigo-600 dark:text-indigo-400"
                  >
                    View Project <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                )}
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              No portfolio items yet. Add your first project!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}