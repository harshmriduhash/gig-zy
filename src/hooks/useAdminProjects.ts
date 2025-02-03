import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import type { Project } from '../types';

interface ProjectFilters {
  status: string;
  category: string;
  timeframe: string;
}

export function useAdminProjects(filters: ProjectFilters) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        let query = supabase
          .from('projects')
          .select(`
            *,
            client:client_id (
              id,
              full_name,
              avatar_url
            ),
            freelancer:freelancer_id (
              id,
              full_name,
              avatar_url
            ),
            bids (count),
            milestones (count)
          `)
          .order('created_at', { ascending: false });

        if (filters.status !== 'all') {
          query = query.eq('status', filters.status);
        }
        if (filters.category !== 'all') {
          query = query.eq('category', filters.category);
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
            case 'quarter':
              date.setMonth(date.getMonth() - 3);
              break;
          }
          query = query.gte('created_at', date.toISOString());
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, [filters]);

  const updateProjectStatus = async (projectId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ status })
        .eq('id', projectId);

      if (error) throw error;

      setProjects(projects.map(project => 
        project.id === projectId ? { ...project, status } : project
      ));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update project status');
    }
  };

  return { projects, isLoading, error, updateProjectStatus };
}