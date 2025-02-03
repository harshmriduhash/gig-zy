import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import { useAuth } from '../contexts/AuthContext';

interface AdminStats {
  totalUsers: number;
  activeProjects: number;
  totalRevenue: number;
  openDisputes: number;
  userGrowth: number;
  projectGrowth: number;
  revenueGrowth: number;
  disputeResolutionRate: number;
}

export function useAdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeProjects: 0,
    totalRevenue: 0,
    openDisputes: 0,
    userGrowth: 0,
    projectGrowth: 0,
    revenueGrowth: 0,
    disputeResolutionRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchAdminStats() {
      try {
        if (!user) throw new Error('No authenticated user');

        // Check admin permission
        const { data: hasPermission } = await supabase
          .rpc('check_admin_role', { check_user_id: user.id });

        if (!hasPermission) {
          throw new Error('Unauthorized access');
        }

        // Fetch total users
        const { count: totalUsers } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true });

        // Fetch active projects
        const { count: activeProjects } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'in_progress');

        // Fetch total revenue
        const { data: revenue } = await supabase
          .from('transactions')
          .select('amount')
          .eq('status', 'completed');

        const totalRevenue = revenue?.reduce((sum, t) => sum + t.amount, 0) || 0;

        // Fetch open disputes
        const { count: openDisputes } = await supabase
          .from('transaction_disputes')
          .select('*', { count: 'exact', head: true })
          .is('resolved_at', null);

        // Calculate growth rates (last 30 days vs previous 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

        // User growth
        const { count: recentUsers } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', thirtyDaysAgo.toISOString());

        const { count: previousUsers } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', sixtyDaysAgo.toISOString())
          .lt('created_at', thirtyDaysAgo.toISOString());

        const userGrowth = previousUsers ? ((recentUsers - previousUsers) / previousUsers) * 100 : 0;

        setStats({
          totalUsers: totalUsers || 0,
          activeProjects: activeProjects || 0,
          totalRevenue,
          openDisputes: openDisputes || 0,
          userGrowth,
          projectGrowth: 0, // Calculate similar to userGrowth
          revenueGrowth: 0, // Calculate similar to userGrowth
          disputeResolutionRate: 0 // Calculate based on resolved vs total disputes
        });
      } catch (err) {
        console.error('Error fetching admin stats:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch admin stats'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchAdminStats();
  }, [user]);

  return { stats, isLoading, error };
}