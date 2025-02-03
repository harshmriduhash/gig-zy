import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import type { Project, Bid, Milestone } from '../types';

export function useClientProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select(`
            *,
            client:client_id (
              full_name,
              avatar_url
            ),
            freelancer:freelancer_id (
              full_name,
              avatar_url,
              rating
            ),
            bids (
              *,
              freelancer:freelancer_id (
                full_name,
                avatar_url,
                rating
              )
            ),
            milestones (
              *,
              transactions (
                amount,
                status,
                completed_at
              )
            )
          `)
          .eq('client_id', (await supabase.auth.getUser()).data.user?.id)
          .order('created_at', { ascending: false });

        if (projectsError) throw projectsError;

        const allBids = projectsData.flatMap(p => p.bids || []);
        const allMilestones = projectsData.flatMap(p => p.milestones || []);

        setProjects(projectsData);
        setBids(allBids);
        setMilestones(allMilestones);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    // Subscribe to real-time updates
    const projectsSubscription = supabase
      .channel('client-projects')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'projects'
      }, fetchData)
      .subscribe();

    return () => {
      projectsSubscription.unsubscribe();
    };
  }, []);

  return { projects, bids, milestones, isLoading, error };
}