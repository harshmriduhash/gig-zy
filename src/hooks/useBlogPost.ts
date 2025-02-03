import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data: contentType } = await supabase
          .from('content_types')
          .select('id')
          .eq('slug', 'blog-posts')
          .single();

        if (!contentType) throw new Error('Blog content type not found');

        const { data, error: postError } = await supabase
          .from('content_items')
          .select('*')
          .eq('type_id', contentType.id)
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (postError) throw postError;
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch blog post'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, isLoading, error };
}