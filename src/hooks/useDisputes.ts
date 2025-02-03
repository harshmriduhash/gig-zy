import { useState } from 'react';
import { supabase } from '../lib/supabase/client';

interface DisputeData {
  transaction_id: string;
  reason: string;
  evidence?: string;
}

export function useDisputes() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createDispute = async (data: DisputeData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Start a transaction to handle both dispute creation and payment status update
      const { data: dispute, error: disputeError } = await supabase
        .from('transaction_disputes')
        .insert({
          ...data,
          raised_by: user.id,
          status: 'open'
        })
        .select()
        .single();

      if (disputeError) throw disputeError;

      // Update transaction status to disputed
      const { error: transactionError } = await supabase
        .from('transactions')
        .update({ status: 'disputed' })
        .eq('id', data.transaction_id);

      if (transactionError) throw transactionError;

      // Notify admin (you would implement this with your notification system)
      await notifyAdmin(dispute.id);

      return dispute;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create dispute'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resolveDispute = async (disputeId: string, resolution: 'refund' | 'release', notes: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: dispute } = await supabase
        .from('transaction_disputes')
        .select('transaction_id')
        .eq('id', disputeId)
        .single();

      if (!dispute) throw new Error('Dispute not found');

      // Update dispute status
      const { error: disputeError } = await supabase
        .from('transaction_disputes')
        .update({
          status: 'resolved',
          resolved_at: new Date().toISOString(),
          resolution_notes: notes
        })
        .eq('id', disputeId);

      if (disputeError) throw disputeError;

      // Update transaction status based on resolution
      const { error: transactionError } = await supabase
        .from('transactions')
        .update({
          status: resolution === 'refund' ? 'refunded' : 'completed',
          completed_at: resolution === 'release' ? new Date().toISOString() : null
        })
        .eq('id', dispute.transaction_id);

      if (transactionError) throw transactionError;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to resolve dispute'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to notify admin
  const notifyAdmin = async (disputeId: string) => {
    // Implement your notification logic here
    console.log('Admin notified of dispute:', disputeId);
  };

  return {
    isLoading,
    error,
    createDispute,
    resolveDispute
  };
}