import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

export function useHomeContent() {
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const { data: contentType } = await supabase
          .from('content_types')
          .select('id')
          .eq('slug', 'home')
          .single();

        if (!contentType) throw new Error('Home content type not found');

        const { data, error: contentError } = await supabase
          .from('content_items')
          .select('*')
          .eq('type_id', contentType.id)
          .eq('status', 'published')
          .single();

        if (contentError) throw contentError;
        setContent(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch home content'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();
  }, []);

  return { content, isLoading, error };
}