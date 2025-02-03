import { useState } from 'react';
import { supabase } from '../lib/supabase/client';

interface PaymentData {
  project_id: string;
  milestone_id: string;
  amount: number;
  payment_method: string;
}

export function usePayments() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createPayment = async (data: PaymentData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: payment, error: paymentError } = await supabase
        .from('transactions')
        .insert({
          ...data,
          sender_id: user.id,
          status: 'pending'
        })
        .select()
        .single();

      if (paymentError) throw paymentError;
      return payment;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create payment'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const releasePayment = async (paymentId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('transactions')
        .update({ 
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', paymentId);

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to release payment'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createPayment,
    releasePayment
  };
}