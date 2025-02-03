import { useState } from 'react';
import { supabase } from '../lib/supabase/client';

interface ReviewData {
  reviewee_id: string;
  project_id: string;
  rating: number;
  review_text: string;
}

export function useReviews() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitReview = async (data: ReviewData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: review, error: reviewError } = await supabase
        .from('reviews')
        .insert({
          ...data,
          reviewer_id: user.id
        })
        .select()
        .single();

      if (reviewError) throw reviewError;
      return review;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to submit review'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    submitReview
  };
}