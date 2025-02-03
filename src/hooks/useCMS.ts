import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import type { ContentType, ContentItem } from '../types/cms';

export function useCMS() {
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        // Fetch content types
        const { data: types, error: typesError } = await supabase
          .from('content_types')
          .select('*')
          .order('name');

        if (typesError) throw typesError;

        // Fetch content items
        const { data: items, error: itemsError } = await supabase
          .from('content_items')
          .select(`
            *,
            type:type_id (
              name,
              slug,
              fields
            ),
            created_by (
              full_name
            ),
            updated_by (
              full_name
            )
          `)
          .order('updated_at', { ascending: false });

        if (itemsError) throw itemsError;

        setContentTypes(types || []);
        setContentItems(items || []);
      } catch (err) {
        console.error('Error fetching CMS data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch CMS data'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, []);

  const createContent = async (typeId: string, data: any) => {
    try {
      const { data: contentType } = await supabase
        .from('content_types')
        .select('slug')
        .eq('id', typeId)
        .single();

      if (!contentType) throw new Error('Content type not found');

      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const { data: newContent, error } = await supabase
        .from('content_items')
        .insert({
          type_id: typeId,
          title: data.title,
          slug,
          content: data,
          status: 'draft'
        })
        .select()
        .single();

      if (error) throw error;
      return newContent;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create content');
    }
  };

  const updateContent = async (id: string, data: any) => {
    try {
      const { data: updatedContent, error } = await supabase
        .from('content_items')
        .update({
          title: data.title,
          content: data,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return updatedContent;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update content');
    }
  };

  const publishContent = async (id: string) => {
    try {
      const { data: publishedContent, error } = await supabase
        .from('content_items')
        .update({
          status: 'published',
          published_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return publishedContent;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to publish content');
    }
  };

  const archiveContent = async (id: string) => {
    try {
      const { data: archivedContent, error } = await supabase
        .from('content_items')
        .update({
          status: 'archived'
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return archivedContent;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to archive content');
    }
  };

  return {
    contentTypes,
    contentItems,
    isLoading,
    error,
    createContent,
    updateContent,
    publishContent,
    archiveContent
  };
}