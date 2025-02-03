import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

interface UseBlogPostsOptions {
  category?: string;
  tag?: string;
  limit?: number;
}

export function useBlogPosts(options: UseBlogPostsOptions = {}) {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data: contentType } = await supabase
          .from('content_types')
          .select('id')
          .eq('slug', 'blog-posts')
          .single();

        if (!contentType) throw new Error('Blog content type not found');

        let query = supabase
          .from('content_items')
          .select('*')
          .eq('type_id', contentType.id)
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (options.category) {
          query = query.eq('content->>category', options.category);
        }

        if (options.tag) {
          query = query.contains('content->>tags', [options.tag]);
        }

        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data, error: postsError } = await query;

        if (postsError) throw postsError;
        setPosts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch blog posts'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [options.category, options.tag, options.limit]);

  return { posts, isLoading, error };
}