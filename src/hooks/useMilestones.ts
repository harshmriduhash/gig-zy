import { useState } from 'react';
import { supabase } from '../lib/supabase/client';

interface MilestoneData {
  project_id: string;
  description: string;
  amount: number;
  due_date: string;
}

export function useMilestones() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createMilestone = async (data: MilestoneData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: milestone, error: milestoneError } = await supabase
        .from('milestones')
        .insert({
          ...data,
          status: 'not_started'
        })
        .select()
        .single();

      if (milestoneError) throw milestoneError;
      return milestone;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create milestone'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMilestoneStatus = async (milestoneId: string, status: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('milestones')
        .update({ status })
        .eq('id', milestoneId);

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update milestone status'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createMilestone,
    updateMilestoneStatus
  };
}