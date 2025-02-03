import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  parent_id: string | null;
  project_count: number;
  freelancer_count: number;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchCategories() {
      try {
        // Fetch categories with project and freelancer counts
        const { data, error: categoriesError } = await supabase
          .from('categories')
          .select(`
            *,
            projects:projects (count),
            freelancers:freelancer_profiles (count)
          `)
          .order('name');

        if (categoriesError) throw categoriesError;

        if (mounted) {
          setCategories(data?.map(category => ({
            ...category,
            project_count: category.projects.count,
            freelancer_count: category.freelancers.count
          })) || []);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch categories'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCategories();

    return () => {
      mounted = false;
    };
  }, []);

  const getCategoryHierarchy = (categoryId: string | null = null): Category[] => {
    return categories
      .filter(category => category.parent_id === categoryId)
      .map(category => ({
        ...category,
        subcategories: getCategoryHierarchy(category.id)
      })) as Category[];
  };

  const getCategoryPath = (categoryId: string): Category[] => {
    const path: Category[] = [];
    let currentCategory = categories.find(c => c.id === categoryId);
    
    while (currentCategory) {
      path.unshift(currentCategory);
      currentCategory = categories.find(c => c.id === currentCategory?.parent_id);
    }

    return path;
  };

  return {
    categories,
    isLoading,
    error,
    getCategoryHierarchy,
    getCategoryPath
  };
}