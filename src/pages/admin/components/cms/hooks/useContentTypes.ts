import { useState, useEffect } from 'react';
import { supabase } from '../../../../../lib/supabase/client';
import type { ContentType } from '../types';

export function useContentTypes() {
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchContentTypes() {
      try {
        setError(null);
        const { data, error: fetchError } = await supabase
          .from('content_types')
          .select('*')
          .order('name');

        if (fetchError) throw fetchError;
        
        if (isMounted) {
          setContentTypes(data || []);
        }
      } catch (err) {
        console.error('Error fetching content types:', err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch content types'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchContentTypes();

    return () => {
      isMounted = false;
    };
  }, []);

  const createContentType = async (data: Omit<ContentType, 'id'>) => {
    try {
      setError(null);
      const { data: contentType, error } = await supabase
        .from('content_types')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      
      setContentTypes(prev => [...prev, contentType]);
      return contentType;
    } catch (err) {
      console.error('Error creating content type:', err);
      throw err instanceof Error ? err : new Error('Failed to create content type');
    }
  };

  const updateContentType = async (id: string, data: Partial<ContentType>) => {
    try {
      setError(null);
      const { data: contentType, error } = await supabase
        .from('content_types')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setContentTypes(prev => 
        prev.map(type => type.id === id ? contentType : type)
      );
      return contentType;
    } catch (err) {
      console.error('Error updating content type:', err);
      throw err instanceof Error ? err : new Error('Failed to update content type');
    }
  };

  const deleteContentType = async (id: string) => {
    try {
      setError(null);
      const { error } = await supabase
        .from('content_types')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setContentTypes(prev => prev.filter(type => type.id !== id));
    } catch (err) {
      console.error('Error deleting content type:', err);
      throw err instanceof Error ? err : new Error('Failed to delete content type');
    }
  };

  return {
    contentTypes,
    isLoading,
    error,
    createContentType,
    updateContentType,
    deleteContentType
  };
}