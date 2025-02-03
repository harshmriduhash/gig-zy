import { useState } from 'react';
import { supabase } from '../lib/supabase/client';

interface BidData {
  project_id: string;
  amount: number;
  proposed_timeline: string;
  cover_note: string;
}

export function useBidding() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitBid = async (data: BidData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: bid, error: bidError } = await supabase
        .from('bids')
        .insert({
          ...data,
          freelancer_id: user.id,
          status: 'pending'
        })
        .select()
        .single();

      if (bidError) throw bidError;
      return bid;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to submit bid'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateBidStatus = async (bidId: string, status: 'shortlisted' | 'accepted' | 'rejected') => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('bids')
        .update({ status })
        .eq('id', bidId);

      if (error) throw error;

      // If bid is accepted, update project status
      if (status === 'accepted') {
        const { data: bid } = await supabase
          .from('bids')
          .select('project_id')
          .eq('id', bidId)
          .single();

        if (bid) {
          const { error: projectError } = await supabase
            .from('projects')
            .update({ status: 'in_progress' })
            .eq('id', bid.project_id);

          if (projectError) throw projectError;
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update bid status'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    submitBid,
    updateBidStatus
  };
}