import { useState } from 'react';
import { supabase } from '../lib/supabase/client';

interface WorkflowStep {
  id: string;
  content_id: string;
  status: 'pending_review' | 'approved' | 'rejected';
  reviewer_id: string;
  comments: string;
  created_at: string;
}

export function useContentWorkflow() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitForReview = async (contentId: string, reviewerId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Create workflow step
      const { data: workflowStep, error: stepError } = await supabase
        .from('workflow_steps')
        .insert({
          content_id: contentId,
          reviewer_id: reviewerId,
          status: 'pending_review'
        })
        .select()
        .single();

      if (stepError) throw stepError;

      // Update content status
      const { error: contentError } = await supabase
        .from('content_items')
        .update({ workflow_status: 'in_review' })
        .eq('id', contentId);

      if (contentError) throw contentError;

      return workflowStep;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to submit for review');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const reviewContent = async (stepId: string, approved: boolean, comments: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Update workflow step
      const { data: workflowStep, error: stepError } = await supabase
        .from('workflow_steps')
        .update({
          status: approved ? 'approved' : 'rejected',
          comments
        })
        .eq('id', stepId)
        .select()
        .single();

      if (stepError) throw stepError;

      // Update content status if approved
      if (approved) {
        const { error: contentError } = await supabase
          .from('content_items')
          .update({
            status: 'published',
            workflow_status: 'approved',
            published_at: new Date().toISOString()
          })
          .eq('id', workflowStep.content_id);

        if (contentError) throw contentError;
      }

      return workflowStep;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to review content');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submitForReview,
    reviewContent,
    isLoading,
    error
  };
}