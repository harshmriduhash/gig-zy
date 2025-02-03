import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import { useAuth } from '../contexts/AuthContext';

export function useRecommendations() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchRecommendations() {
      try {
        if (!user) return;

        // Get user's profile and skills
        const { data: profile } = await supabase
          .from('freelancer_profiles')
          .select('skills')
          .eq('user_id', user.id)
          .single();

        // Get user's recent activity
        const { data: recentActivity } = await supabase
          .from('activity_log')
          .select('content_type, content_id')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        // Get recommended projects based on skills and activity
        const { data: recommendedProjects, error: projectsError } = await supabase
          .from('projects')
          .select(`
            *,
            client:client_id (
              full_name,
              avatar_url,
              rating
            ),
            bids (count)
          `)
          .eq('status', 'open')
          .contains('required_skills', profile?.skills || [])
          .order('created_at', { ascending: false })
          .limit(5);

        if (projectsError) throw projectsError;

        // Get recommended freelancers based on similar skills
        const { data: recommendedFreelancers, error: freelancersError } = await supabase
          .from('freelancer_profiles')
          .select(`
            *,
            user:user_id (
              full_name,
              avatar_url,
              rating,
              location
            )
          `)
          .neq('user_id', user.id)
          .contains('skills', profile?.skills || [])
          .order('rating', { ascending: false })
          .limit(5);

        if (freelancersError) throw freelancersError;

        if (mounted) {
          setRecommendations([
            ...recommendedProjects.map(p => ({ type: 'project', ...p })),
            ...recommendedFreelancers.map(f => ({ type: 'freelancer', ...f }))
          ]);
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch recommendations'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    fetchRecommendations();

    return () => {
      mounted = false;
    };
  }, [user]);

  return { recommendations, isLoading, error };
}