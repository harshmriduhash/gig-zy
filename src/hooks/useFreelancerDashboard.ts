import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import { useAuth } from '../contexts/AuthContext';

interface DashboardStats {
  activeProjects: number;
  totalEarnings: number;
  completedProjects: number;
  averageRating: number;
}

export function useFreelancerDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    activeProjects: 0,
    totalEarnings: 0,
    completedProjects: 0,
    averageRating: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        if (!user) throw new Error('No authenticated user');

        // Fetch freelancer profile data
        const { data: profile, error: profileError } = await supabase
          .from('freelancer_profiles')
          .select(`
            total_earnings,
            jobs_completed,
            user:user_id (
              rating
            )
          `)
          .eq('user_id', user.id)
          .single();

        if (profileError) throw profileError;

        // Fetch active projects count
        const { count: activeProjects, error: projectsError } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })
          .eq('freelancer_id', user.id)
          .in('status', ['in_progress']);

        if (projectsError) throw projectsError;

        setStats({
          activeProjects: activeProjects || 0,
          totalEarnings: profile?.total_earnings || 0,
          completedProjects: profile?.jobs_completed || 0,
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