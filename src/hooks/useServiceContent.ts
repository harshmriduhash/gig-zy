import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

export function useServiceContent(slug: string) {
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const { data: contentType } = await supabase
          .from('content_types')
          .select('id')
          .eq('slug', 'services')
          .single();

        if (!contentType) throw new Error('Service content type not found');

        const { data, error: contentError } = await supabase
          .from('content_items')
          .select('*')
          .eq('type_id', contentType.id)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (contentError) throw contentError;
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch service content'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, [slug]);

  return { content, isLoading, error };
}