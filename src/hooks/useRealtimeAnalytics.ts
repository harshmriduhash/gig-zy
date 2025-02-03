import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';

interface RealtimeMetrics {
  activeUsers: number;
  ongoingProjects: number;
  pendingTransactions: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

export function useRealtimeAnalytics() {
  const [metrics, setMetrics] = useState<RealtimeMetrics>({
    activeUsers: 0,
    ongoingProjects: 0,
    pendingTransactions: 0,
    recentActivity: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadInitialData = async () => {
      try {
        // Fetch initial metrics
        const [
          { count: activeUsers },
          { count: ongoingProjects },
          { count: pendingTransactions },
          { data: recentActivity }
        ] = await Promise.all([
          // Active users (users with recent activity)
          supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .gte('last_activity', new Date(Date.now() - 15 * 60 * 1000).toISOString()),

          // Ongoing projects
          supabase
            .from('projects')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'in_progress'),

          // Pending transactions
          supabase
            .from('transactions')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'pending'),

          // Recent activity
          supabase
            .from('activity_log')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10)
        ]);

        if (mounted) {
          setMetrics({
            activeUsers: activeUsers || 0,
            ongoingProjects: ongoingProjects || 0,
            pendingTransactions: pendingTransactions || 0,
            recentActivity: recentActivity || []
          });
        }
      } catch (err) {
        console.error('Error loading realtime metrics:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load realtime metrics'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadInitialData();

    // Subscribe to realtime updates
    const usersSubscription = supabase
      .channel('users-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'users'
      }, async () => {
        // Update active users count
        const { count } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })
          .gte('last_activity', new Date(Date.now() - 15 * 60 * 1000).toISOString());

        if (mounted) {
          setMetrics(prev => ({ ...prev, activeUsers: count || 0 }));
        }
      })
      .subscribe();

    const projectsSubscription = supabase
      .channel('projects-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'projects'
      }, async () => {
        // Update ongoing projects count
        const { count } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'in_progress');

        if (mounted) {
          setMetrics(prev => ({ ...prev, ongoingProjects: count || 0 }));
        }
      })
      .subscribe();

    const transactionsSubscription = supabase
      .channel('transactions-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'transactions'
      }, async () => {
        // Update pending transactions count
        const { count } = await supabase
          .from('transactions')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        if (mounted) {
          setMetrics(prev => ({ ...prev, pendingTransactions: count || 0 }));
        }
      })
      .subscribe();

    const activitySubscription = supabase
      .channel('activity-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'activity_log'
      }, payload => {
        if (mounted) {
          setMetrics(prev => ({
            ...prev,
            recentActivity: [
              payload.new as any,
              ...prev.recentActivity.slice(0, 9)
            ]
          }));
        }
      })
      .subscribe();

    return () => {
      mounted = false;
      usersSubscription.unsubscribe();
      projectsSubscription.unsubscribe();
      transactionsSubscription.unsubscribe();
      activitySubscription.unsubscribe();
    };
  }, []);

  return { metrics, isLoading, error };
}