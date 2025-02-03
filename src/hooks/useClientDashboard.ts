import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import { useAuth } from '../contexts/AuthContext';

interface DashboardStats {
  activeProjects: number;
  totalSpent: number;
  openProjects: number;
  activeBids: number;
  completedProjects: number;
  averageRating: number;
}

export function useClientDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    activeProjects: 0,
    totalSpent: 0,
    openProjects: 0,
    activeBids: 0,
    completedProjects: 0,
    averageRating: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        if (!user) throw new Error('No authenticated user');

        // Fetch client profile data
        const { data: profile, error: profileError } = await supabase
          .from('client_profiles')
          .select(`
            total_spent,
            projects_posted,
            user:user_id (
              rating
            )
          `)
          .eq('user_id', user.id)
          .single();

        if (profileError) throw profileError;

        // Fetch project statistics
        const { data: projects, error: projectsError } = await supabase
          .from('projects')
          .select('status')
          .eq('client_id', user.id);

        if (projectsError) throw projectsError;

        // Count projects by status
        const activeProjects = projects?.filter(p => p.status === 'in_progress').length || 0;
        const openProjects = projects?.filter(p => p.status === 'open').length || 0;
        const completedProjects = projects?.filter(p => p.status === 'completed').length || 0;

        // Fetch active bids count
        const { count: activeBids, error: bidsError } = await supabase
          .from('bids')
          .select('*', { count: 'exact', head: true })
          .eq('project_id', projects?.map(p => p.id))
          .eq('status', 'pending');

        if (bidsError) throw bidsError;

        setStats({
          activeProjects,
          totalSpent: profile?.total_spent || 0,
          openProjects,
          activeBids: activeBids || 0,
          completedProjects,
          averageRating: profile?.user?.rating || 0
        });
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch dashboard data'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, [user]);

  return { stats, isLoading, error };
}