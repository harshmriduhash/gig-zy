import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';

export function CategoryBrowser() {
  const { categories, isLoading, error, getCategoryHierarchy, getCategoryPath } = useCategories();
  const [selectedPath, setSelectedPath] = useState<string[]>([]);

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <p className="text-red-700 dark:text-red-300">
          Error loading categories: {error.message}
        </p>
      </div>
    );
  }

  const currentCategories = selectedPath.length === 0
    ? getCategoryHierarchy(null)
    : getCategoryHierarchy(selectedPath[selectedPath.length - 1]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Breadcrumb */}
      {selectedPath.length > 0 && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex items-center space-x-1 text-sm">
            <Link
              to="#"
              onClick={() => setSelectedPath([])}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              All Categories
            </Link>
            {selectedPath.map((categoryId, index) => {
              const category = categories.find(c => c.id === categoryId);
              return (
                <React.Fragment key={categoryId}>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <Link
                    to="#"
                    onClick={() => setSelectedPath(selectedPath.slice(0, index + 1))}
                    className={`${
                      index === selectedPath.length - 1
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {category?.name}
                  </Link>
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      )}

      {/* Category Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            ))
          ) : (
            currentCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedPath([...selectedPath, category.id])}
                className="group relative bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  {category.subcategories?.length > 0 && (
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span className="mr-4">{category.project_count} Projects</span>
                  <span>{category.freelancer_count} Freelancers</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}