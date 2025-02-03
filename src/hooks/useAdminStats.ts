import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

interface AdminStats {
  totalUsers: number;
  userGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
  activeProjects: number;
  projectGrowth: number;
  openDisputes: number;
  disputeChange: number;
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch total users and growth
        const { count: totalUsers } = await supabase
          .from('users')
          .select('*', { count: 'exact' });

        const { count: lastMonthUsers } = await supabase
          .from('users')
          .select('*', { count: 'exact' })
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        // Fetch revenue stats
        const { data: transactions } = await supabase
          .from('transactions')
          .select('amount, created_at')
          .eq('status', 'completed');

        const totalRevenue = transactions?.reduce((sum, t) => sum + t.amount, 0) || 0;
        
        // Calculate revenue from last month
        const lastMonthRevenue = transactions
          ?.filter(t => new Date(t.created_at) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
          .reduce((sum, t) => sum + t.amount, 0) || 0;

        // Fetch project stats
        const { count: activeProjects } = await supabase
          .from('projects')
          .select('*', { count: 'exact' })
          .in('status', ['open', 'in_progress']);

        const { count: lastMonthProjects } = await supabase
          .from('projects')
          .select('*', { count: 'exact' })
          .in('status', ['open', 'in_progress'])
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        // Fetch dispute stats
        const { count: openDisputes } = await supabase
          .from('transaction_disputes')
          .select('*', { count: 'exact' })
          .is('resolved_at', null);

        const { count: lastMonthDisputes } = await supabase
          .from('transaction_disputes')
          .select('*', { count: 'exact' })
          .is('resolved_at', null)
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

        setStats({
          totalUsers: totalUsers || 0,
          userGrowth: lastMonthUsers ? Math.round((lastMonthUsers / totalUsers!) * 100) : 0,
          totalRevenue,
          revenueGrowth: totalRevenue ? Math.round((lastMonthRevenue / totalRevenue) * 100) : 0,
          activeProjects: activeProjects || 0,
          projectGrowth: activeProjects ? Math.round((lastMonthProjects! / activeProjects) * 100) : 0,
          openDisputes: openDisputes || 0,
          disputeChange: openDisputes ? Math.round((lastMonthDisputes! / openDisputes) * 100) : 0
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch admin stats'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, isLoading, error };
}