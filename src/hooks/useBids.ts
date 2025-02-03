import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import type { Bid } from '../types';

export function useBids() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoadingBids, setIsLoadingBids] = useState(true);
  const [bidsError, setBidsError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBids() {
      try {
        const { data, error } = await supabase
          .from('bids')
          .select(`
            *,
            project:project_id (
              title,
              description,
              client:client_id (
                full_name
              )
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBids(data);
      } catch (err) {
        setBidsError(err instanceof Error ? err : new Error('Failed to fetch bids'));
      } finally {
        setIsLoadingBids(false);
      }
    }

    fetchBids();
  }, []);

  return { bids, isLoadingBids, bidsError };
}