import { useState, useEffect } from 'react';
import { supabase } from '../../../../../lib/supabase/client';
import type { ContentItem } from '../types';

export function useContent() {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchContent() {
      try {
        setError(null);
        const { data, error: fetchError } = await supabase
          .from('content_items')
          .select(`
            *,
            type:type_id (
              id,
              name,
              slug,
              fields
            )
          `)
          .order('updated_at', { ascending: false });

        if (fetchError) throw fetchError;
        
        if (isMounted) {
          setContentItems(data || []);
        }
      } catch (err) {
        console.error('Error fetching content:', err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch content'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const createContent = async (typeId: string, data: any) => {
    try {
      setError(null);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Start a transaction
      const { data: content, error: contentError } = await supabase
        .from('content_items')
        .insert({
          type_id: typeId,
          title: data.title,
          slug: data.title.toLowerCase().replace(/\s+/g, '-'),
          content: data,
          created_by: user.id,
          updated_by: user.id
        })
        .select()
        .single();

      if (contentError) throw contentError;

      // Create initial revision
      const { error: revisionError } = await supabase
        .from('content_revisions')
        .insert({
          content_id: content.id,
          content: data,
          created_by: user.id
        });

      if (revisionError) throw revisionError;
      
      setContentItems(prev => [content, ...prev]);
      return content;
    } catch (err) {
      console.error('Error creating content:', err);
      throw err instanceof Error ? err : new Error('Failed to create content');
    }
  };

  const updateContent = async (id: string, data: any) => {
    try {
      setError(null);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create a new revision first
      const { error: revisionError } = await supabase
        .from('content_revisions')
        .insert({
          content_id: id,
          content: data,
          created_by: user.id
        });

      if (revisionError) throw revisionError;

      // Then update the content item
      const { data: content, error: contentError } = await supabase
        .from('content_items')
        .update({
          content: data,
          updated_by: user.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (contentError) throw contentError;

      setContentItems(prev => 
        prev.map(item => item.id === id ? content : item)
      );
      return content;
    } catch (err) {
      console.error('Error updating content:', err);
      throw err instanceof Error ? err : new Error('Failed to update content');
    }
  };

  const updateContentStatus = async (id: string, status: 'draft' | 'published' | 'archived') => {
    try {
      setError(null);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const updates: any = {
        status,
        updated_by: user.id,
        updated_at: new Date().toISOString()
      };

      if (status === 'published') {
        updates.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('content_items')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setContentItems(prev =>
        prev.map(item => item.id === id ? { ...item, ...updates } : item)
      );
    } catch (err) {
      console.error('Error updating content status:', err);
      throw err instanceof Error ? err : new Error('Failed to update content status');
    }
  };

  return {
    contentItems,
    isLoading,
    error,
    createContent,
    updateContent,
    updateContentStatus
  };
}