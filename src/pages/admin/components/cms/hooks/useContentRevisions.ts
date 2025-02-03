import { useState, useEffect } from 'react';
import { supabase } from '../../../../../lib/supabase/client';
import type { ContentRevision } from '../types';

export function useContentRevisions(contentId: string) {
  const [revisions, setRevisions] = useState<ContentRevision[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchRevisions() {
      try {
        setError(null);
        const { data, error: fetchError } = await supabase
          .from('content_revisions')
          .select(`
            *,
            created_by:created_by (
              id,
              full_name
            )
          `)
          .eq('content_id', contentId)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        
        if (isMounted) {
          setRevisions(data || []);
        }
      } catch (err) {
        console.error('Error fetching revisions:', err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch revisions'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchRevisions();

    return () => {
      isMounted = false;
    };
  }, [contentId]);

  const restoreRevision = async (revisionId: string) => {
    try {
      setError(null);
      const { data: revision } = await supabase
        .from('content_revisions')
        .select('content')
        .eq('id', revisionId)
        .single();

      if (!revision) throw new Error('Revision not found');

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Update content item with revision data
      const { error: updateError } = await supabase
        .from('content_items')
        .update({
          content: revision.content,
          updated_by: user.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', contentId);

      if (updateError) throw updateError;

      // Create a new revision for the current state before restoring
      const { error: revisionError } = await supabase
        .from('content_revisions')
        .insert({
          content_id: contentId,
          content: revision.content,
          created_by: user.id
        });

      if (revisionError) throw revisionError;

      // Refresh revisions list
      const { data: newRevisions, error: fetchError } = await supabase
        .from('content_revisions')
        .select(`
          *,
          created_by:created_by (
            id,
            full_name
          )
        `)
        .eq('content_id', contentId)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setRevisions(newRevisions || []);
    } catch (err) {
      console.error('Error restoring revision:', err);
      throw err instanceof Error ? err : new Error('Failed to restore revision');
    }
  };

  return {
    revisions,
    isLoading,
    error,
    restoreRevision
  };
}