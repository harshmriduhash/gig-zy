import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MegaMenu } from './mega-menu/MegaMenu';
import { categories } from './data/categories';
import { aiServices } from './mega-menu/data/aiServices';
import { dataServices } from './mega-menu/data/dataServices';
import { aiApplications } from './mega-menu/data/aiApplications';
import { genAiServices } from './mega-menu/data/genAiServices';
import { aiBusinessSolutions } from './mega-menu/data/aiBusinessSolutions';
import { aiMaintenanceSupport } from './mega-menu/data/aiMaintenanceSupport';
import { aiLearningUpskilling } from './mega-menu/data/aiLearningUpskilling';
import { automationServices } from './mega-menu/data/automationServices';
import type { ServiceCategory } from './mega-menu/types';

export function CategoryRibbon() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  const getCategoryConfig = (categoryId: string): ServiceCategory | null => {
    switch (categoryId) {
      case 'ai-dev':
        return aiServices;
      case 'data-services':
        return dataServices;
      case 'ai-apps':
        return aiApplications;
      case 'gen-ai':
        return genAiServices;
      case 'ai-business':
        return aiBusinessSolutions;
      case 'ai-maintenance':
        return aiMaintenanceSupport;
      case 'ai-learning':
        return aiLearningUpskilling;
      case 'ai-automation':
        return automationServices;
      default:
        return null;
    }
  };

  const categoryConfig = openCategory ? getCategoryConfig(openCategory) : null;

  return (
    <div className="relative bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Gradient Fade Effects */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-gray-800 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-gray-800 to-transparent z-10" />

        {/* Navigation Buttons */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => scroll('left')}
            className="p-1 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => scroll('right')}
            className="p-1 rounded-full bg-white dark:bg-gray-700 shadow-md hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Categories List */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide py-2 space-x-6 px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {category.name}
            </button>
          ))}
        </div>

        {categoryConfig && (
          <MegaMenu
            category={categoryConfig}
            isOpen={true}
            onClose={() => setOpenCategory(null)}
          />
        )}
      </div>
    </div>
  );
}