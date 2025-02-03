import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MegaMenu } from './mega-menu/MegaMenu';
import { aiServices } from './mega-menu/data/aiServices';

export function ServiceCategories() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="relative">
      <button
        onClick={() => handleCategoryClick('ai-development')}
        className="flex items-center space-x-1 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <span>Services</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      <MegaMenu
        category={aiServices}
        isOpen={openCategory === 'ai-development'}
        onClose={() => setOpenCategory(null)}
      />
    </div>
  );
}