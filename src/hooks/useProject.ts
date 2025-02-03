import { useState } from 'react';
import { supabase } from '../lib/supabase/client';
import type { Project } from '../types';

interface ProjectData {
  title: string;
  description: string;
  budget_min: number;
  budget_max: number;
  required_skills: string[];
  deadline: string;
}

export function useProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createProject = async (data: ProjectData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          ...data,
          client_id: user.id,
          status: 'draft'
        })
        .select()
        .single();

      if (projectError) throw projectError;
      return project;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create project'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const publishProject = async (projectId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('projects')
        .update({ status: 'open' })
        .eq('id', projectId);

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to publish project'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createProject,
    publishProject
  };
}