import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import type { Contract } from '../types';

export function useContracts() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoadingContracts, setIsLoadingContracts] = useState(true);
  const [contractsError, setContractsError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchContracts() {
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
            ),
            milestones:project_id (
              id,
              description,
              amount,
              due_date,
              status
            )
          `)
          .eq('status', 'accepted')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setContracts(data);
      } catch (err) {
        setContractsError(err instanceof Error ? err : new Error('Failed to fetch contracts'));
      } finally {
        setIsLoadingContracts(false);
      }
    }

    fetchContracts();
  }, []);

  return { contracts, isLoadingContracts, contractsError };
}