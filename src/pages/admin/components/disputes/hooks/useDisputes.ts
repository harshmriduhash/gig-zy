import { useState, useEffect } from 'react';
import { supabase } from '../../../../../lib/supabase/client';
import type { Dispute } from '../types';

interface DisputeFilters {
  status: string;
  timeframe: string;
  priority: string;
}

export function useDisputes(filters: DisputeFilters) {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchDisputes() {
      try {
        let query = supabase
          .from('transaction_disputes')
          .select(`
            *,
            transaction:transaction_id (
              amount,
              project:project_id (
                title
              )
            ),
            client:client_id (
              full_name
            ),
            freelancer:freelancer_id (
              full_name
            )
          `)
          .order('created_at', { ascending: false });

        if (filters.status !== 'all') {
          query = query.eq('status', filters.status);
        }
        if (filters.priority !== 'all') {
          query = query.eq('priority', filters.priority);
        }
        if (filters.timeframe !== 'all') {
          const date = new Date();
          switch (filters.timeframe) {
            case 'today':
              date.setHours(0, 0, 0, 0);
              break;
            case 'week':
              date.setDate(date.getDate() - 7);
              break;
            case 'month':
              date.setMonth(date.getMonth() - 1);
              break;
          }
          query = query.gte('created_at', date.toISOString());
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setDisputes(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch disputes'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchDisputes();
  }, [filters]);

  const updateDisputeStatus = async (disputeId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('transaction_disputes')
        .update({ status })
        .eq('id', disputeId);

      if (error) throw error;

      setDisputes(disputes.map(dispute => 
        dispute.id === disputeId ? { ...dispute, status } : dispute
      ));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update dispute status');
    }
  };

  return { disputes, isLoading, error, updateDisputeStatus };
}