import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

export function useAINicheService(industry: string) {
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const { data: contentType } = await supabase
          .from('content_types')
          .select('id')
          .eq('slug', 'ai-niche-services')
          .single();

        if (!contentType) throw new Error('AI niche services content type not found');

        const { data, error: contentError } = await supabase
          .from('content_items')
          .select('*')
          .eq('type_id', contentType.id)
          .eq('content->industry', industry)
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
  }, [industry]);

  return { content, isLoading, error };
}