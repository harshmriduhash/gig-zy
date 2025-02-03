import { useState, useEffect } from 'react';
import { supabase } from '../../../../../lib/supabase/client';
import type { Payment, PaymentStats } from '../types';

interface PaymentFilters {
  status: string;
  timeframe: string;
  amount: string;
}

export function usePayments(filters: PaymentFilters) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<PaymentStats>({
    totalVolume: 0,
    volumeChange: 0,
    pendingCount: 0,
    pendingChange: 0,
    successCount: 0,
    successChange: 0,
    failedCount: 0,
    failedChange: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPayments() {
      try {
        let query = supabase
          .from('transactions')
          .select(`
            *,
            project:project_id (
              title
            ),
            milestone:milestone_id (
              description
            )
          `)
          .order('created_at', { ascending: false });

        if (filters.status !== 'all') {
          query = query.eq('status', filters.status);
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
        setPayments(data);

        // Calculate stats
        const totalVolume = data.reduce((sum, p) => sum + p.amount, 0);
        const pendingCount = data.filter(p => p.status === 'pending').length;
        const successCount = data.filter(p => p.status === 'completed').length;
        const failedCount = data.filter(p => p.status === 'failed').length;

        setStats({
          totalVolume,
          volumeChange: 12, // Example change percentage
          pendingCount,
          pendingChange: -5,
          successCount,
          successChange: 8,
          failedCount,
          failedChange: -2
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch payments'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchPayments();
  }, [filters]);

  const updatePaymentStatus = async (paymentId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .update({ status })
        .eq('id', paymentId);

      if (error) throw error;

      setPayments(payments.map(payment => 
        payment.id === paymentId ? { ...payment, status } : payment
      ));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update payment status');
    }
  };

  return { payments, stats, isLoading, error, updatePaymentStatus };
}