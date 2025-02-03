import React from 'react';
import { Link } from 'react-router-dom';
import type { ServiceCategory } from './types';

interface MegaMenuProps {
  category: ServiceCategory;
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ category, isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute left-0 z-40 w-screen bg-white dark:bg-gray-800 shadow-lg rounded-b-lg border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-4 gap-8">
            {/* Category Header */}
            <div className="col-span-4 mb-6 flex items-center">
              <category.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
            </div>

            {/* Subcategories */}
            {category.subcategories.map((subcategory) => (
              <div key={subcategory.id} className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  {subcategory.name}
                </h3>
                <ul className="space-y-2">
                  {subcategory.services.map((service) => (
                    <li key={service.id}>
                      <Link
                        to={service.path}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                        onClick={onClose}
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}